import { 
  DocSpaceSnapshot, 
  DoctorProfile, 
  SBARRecord, 
  CaseRecord 
} from '../types.js';

/**
 * FHIR R4 Adapter
 * Cầu nối chuyển đổi dữ liệu giữa định dạng DocSpace và chuẩn HL7 FHIR R4
 */
export class FhirAdapter {
  
  /**
   * Trích xuất dữ liệu DocSpace thành FHIR Bundle
   */
  static exportToFHIR(snapshot: DocSpaceSnapshot): any {
    const entries: any[] = [];

    // 1. Map Doctor Profile -> Practitioner
    const practitionerId = `practitioner-${snapshot.profile.id}`;
    entries.push({
      fullUrl: `urn:uuid:${practitionerId}`,
      resource: {
        resourceType: 'Practitioner',
        id: practitionerId,
        name: [
          {
            text: snapshot.profile.displayName
          }
        ],
        qualification: snapshot.profile.specialty ? [
          {
            code: {
              text: snapshot.profile.specialty
            }
          }
        ] : []
      }
    });

    // 2. Map SBARs -> Communication
    if (snapshot.sbars && snapshot.sbars.length > 0) {
      snapshot.sbars.forEach(sbar => {
        entries.push({
          fullUrl: `urn:uuid:sbar-${sbar.id}`,
          resource: {
            resourceType: 'Communication',
            id: `sbar-${sbar.id}`,
            status: 'completed',
            subject: { display: sbar.title },
            sender: { reference: `urn:uuid:${practitionerId}` },
            payload: [
              { contentString: `SITUATION:\n${sbar.situation}` },
              { contentString: `BACKGROUND:\n${sbar.background}` },
              { contentString: `ASSESSMENT:\n${sbar.assessment}` },
              { contentString: `RECOMMENDATION:\n${sbar.recommendation}` }
            ],
            sent: sbar.createdAt
          }
        });
      });
    }

    // 3. Map Case Logger -> ClinicalImpression
    if (snapshot.cases && snapshot.cases.length > 0) {
      snapshot.cases.forEach(caseLog => {
        entries.push({
          fullUrl: `urn:uuid:case-${caseLog.id}`,
          resource: {
            resourceType: 'ClinicalImpression',
            id: `case-${caseLog.id}`,
            status: 'completed',
            subject: { display: 'Anonymous Patient' }, 
            assessor: { reference: `urn:uuid:${practitionerId}` },
            description: caseLog.chiefComplaint,
            summary: `Management: ${caseLog.management}. Lesson: ${caseLog.lesson || 'N/A'}. Outcome: ${caseLog.outcome || 'N/A'}`,
            date: caseLog.createdAt
          }
        });
      });
    }

    // Đóng gói thành Bundle
    const bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      timestamp: new Date().toISOString(),
      entry: entries
    };

    return bundle;
  }

  /**
   * Nạp dữ liệu từ FHIR Bundle sang định dạng DocSpace
   */
  static importFromFHIR(fhirJson: any): Partial<DocSpaceSnapshot> {
    const result: Partial<DocSpaceSnapshot> = {
      sbars: [],
      cases: []
    };
    
    if (fhirJson.resourceType !== 'Bundle' || !fhirJson.entry) {
      console.warn("Invalid FHIR Bundle: Missing resourceType or entry array");
      return result;
    }

    fhirJson.entry.forEach((entry: any) => {
      const res = entry.resource;
      if (!res) return;

      // Import SBAR (Communication)
      if (res.resourceType === 'Communication') {
        const payload = res.payload || [];
        const contentStr = payload.map((p: any) => p.contentString).join('\n\n');
        
        result.sbars!.push({
          id: 'imported_sbar_' + Date.now() + Math.floor(Math.random() * 1000),
          doctorId: '', // Sẽ được ghi đè tại storage.ts
          title: res.subject?.display || 'Imported SBAR',
          situation: this.extractSection(contentStr, 'SITUATION:'),
          background: this.extractSection(contentStr, 'BACKGROUND:'),
          assessment: this.extractSection(contentStr, 'ASSESSMENT:'),
          recommendation: this.extractSection(contentStr, 'RECOMMENDATION:'),
          createdAt: res.sent || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDraft: false
        });
      }
      
      // Import Case (ClinicalImpression)
      if (res.resourceType === 'ClinicalImpression') {
         result.cases!.push({
           id: 'imported_case_' + Date.now() + Math.floor(Math.random() * 1000),
           doctorId: '',
           date: res.date ? res.date.split('T')[0] : new Date().toISOString().split('T')[0],
           context: 'other',
           chiefComplaint: res.description || 'Imported Case',
           management: res.summary || '',
           createdAt: res.date || new Date().toISOString()
         });
      }
    });

    return result;
  }

  /**
   * Helper trích xuất các phần SBAR
   */
  private static extractSection(fullText: string, sectionHeader: string): string {
    if (!fullText.includes(sectionHeader)) return '';
    const startIdx = fullText.indexOf(sectionHeader) + sectionHeader.length;
    
    const nextHeaders = ['SITUATION:', 'BACKGROUND:', 'ASSESSMENT:', 'RECOMMENDATION:'];
    let minNextIdx = fullText.length;
    
    for (const h of nextHeaders) {
      if (h === sectionHeader) continue;
      const idx = fullText.indexOf(h, startIdx);
      if (idx !== -1 && idx < minNextIdx) {
        minNextIdx = idx;
      }
    }
    
    return fullText.substring(startIdx, minNextIdx).trim();
  }
}
