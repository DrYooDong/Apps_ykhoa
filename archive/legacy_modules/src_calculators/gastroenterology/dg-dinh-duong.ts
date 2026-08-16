/**
 * CliniPortal — Inpatient Clinical Nutrition Studio (TypeScript Module)
 * Caloric & Macronutrient Needs, Refeeding Prophylaxis & Diet Formulation (MOH Vietnam Decision 2879/QD-BYT)
 */

export interface ClinicalNutritionPlan {
  totalCalories: number;
  totalProtein: number;
  totalCarb: number;
  totalLipid: number;
  totalFluid: number;
  medicalAdvice: string;
  goodFoods: string;
  badFoods: string;
  isRefeedingAlert: boolean;
}

export function computeNutritionPlan(
  weight: number,
  profile: string,
  starvation: string
): ClinicalNutritionPlan | null {
  if (!weight || weight <= 0) return null;

  let kcalPerKg = 25;
  let proteinPerKg = 1.0;
  let fluidPerKg = 30;
  let medAdvice = '';
  let goodFoods = '';
  let badFoods = '';
  const isRefeedingAlert = starvation === 'severe';

  if (isRefeedingAlert) {
    kcalPerKg = 12;
  }

  switch (profile) {
    case 'sepsis':
      if (starvation !== 'severe') kcalPerKg = 25;
      proteinPerKg = 1.3;
      medAdvice = `<strong>Mục tiêu:</strong> Hạn chế tình trạng quá tải calo (overfeeding) ở pha cấp, tập trung tăng lượng protein cao để chống dị hóa, bảo tồn khối cơ và nâng cao miễn dịch. Ưu tiên thiết lập nuôi ăn đường tiêu hóa (EN) sớm trong 24-48h khi huyết động đã ổn định.`;
      goodFoods = `
        <li><strong>Chế biến:</strong> Thức ăn lỏng, mịn, nấu nhừ, dễ tiêu hóa như cháo xay nhuyễn, súp dinh dưỡng phối hợp đa dạng thực phẩm.</li>
        <li><strong>Nguồn đạm quý:</strong> Thịt nạc băm nhỏ, lòng trắng trứng gà, cá nạc xé mịn (đạm có giá trị sinh học cao).</li>
        <li><strong>Vi chất:</strong> Bổ sung nước ép quả chín ngọt dịu (cam, chanh) để tăng cường vitamin C hỗ trợ đáp ứng miễn dịch.</li>
        <li>Sữa bổ sung dinh dưỡng đường miệng (ONS) đậm độ năng lượng và đạm cao (Peptamen, Fresubin HP) khi lượng ăn vào không đạt.</li>`;
      badFoods = `
        <li>Thực phẩm dai cứng, thô, nhiều sợi xơ sụn dễ gây sặc hoặc kích ứng tiêu hóa.</li>
        <li>Món ăn chiên rán, xào quay nhiều dầu mỡ động vật gây đầy bụng, chướng hơi.</li>
        <li>Các loại thực phẩm lạ có nguy cơ cao gây dị ứng thức ăn.</li>`;
      break;

    case 'diabetes':
      if (starvation !== 'severe') kcalPerKg = 25;
      proteinPerKg = 1.0;
      medAdvice = `<strong>Mục tiêu:</strong> Duy trì đường huyết trong ranh giới đích, kiểm soát cân nặng hợp lý và hạn chế mỡ máu. Khẩu phần Glucid chiếm 55-60%, bắt buộc sử dụng glucid phức hợp có chỉ số đường huyết (GI) thấp để làm chậm hấp thu đường.`;
      goodFoods = `
        <li><strong>Tinh bột GI thấp:</strong> Gạo lứt, gạo giã dối, yến mạch, bánh mì đen toàn phần thay thế hoàn toàn cho gạo trắng tinh chế.</li>
        <li><strong>Chất xơ dồi dào:</strong> Rau tươi xanh thẫm, nhuận tràng (rau khoai lang, mồng tơi, bắp cải, rau đay). <em>Mẹo lâm sàng:</em> Ăn rau xanh trước rồi mới ăn tinh bột.</li>
        <li><strong>Đạm lành mạnh:</strong> Thịt nạc, cá nạc, tôm, đậu phụ. Nên ăn cá béo tối thiểu 3 lần mỗi tuần để bổ sung Omega-3.</li>
        <li><strong>Chất béo tốt:</strong> Dầu thực vật không bão hòa (dầu hướng dương, dầu vừng, dầu đậu nành, dầu oliu).</li>
        <li><strong>Quả chín ít đường:</strong> Ăn nguyên múi/miếng các loại bưởi, thanh long, ổi, gioi (mận), cam.</li>
        <li>Sữa dinh dưỡng có chỉ số đường huyết thấp (Glucerna, Nutren Diabet, Quasure Light).</li>`;
      badFoods = `
        <li><strong>Đường hấp thu nhanh:</strong> Đường kính, mật ong, bánh kẹo ngọt, mứt mận, nước ngọt có ga.</li>
        <li>Trái cây sấy khô, mứt tết, quả có hàm lượng đường cực cao (nhãn, vải, mít, chuối chín kỹ).</li>
        <li>Tinh bột tinh chế cao (miến dong, bánh mì trắng, bột sắn dây, bột dong) hoặc khoai củ nướng.</li>
        <li>Mỡ động vật, bơ thực vật chứa chất béo trans, phủ tạng động vật giàu cholesterol.</li>`;
      break;

    case 'cvd':
      if (starvation !== 'severe') kcalPerKg = 25;
      proteinPerKg = 1.0;
      fluidPerKg = 25;
      medAdvice = `<strong>Mục tiêu:</strong> Giảm tải tuần hoàn cơ tim, hỗ trợ hạ áp và ngăn ngừa ứ nước. Thực hiện nghiêm ngặt chế độ ăn nhạt, lượng muối tổng cộng < 5g/ngày (Natri < 2000mg/ngày). Hạn chế dịch lỏng nuôi dưỡng dựa trên chỉ định cân bằng xuất nhập của bác sĩ.`;
      goodFoods = `
        <li><strong>Thực phẩm giàu Kali:</strong> Các loại rau củ quả hỗ trợ thải natri hạ áp như cải thìa, súp lơ, su su, bầu mướp, dưa chuột, bưởi, quýt, thanh long.</li>
        <li><strong>Thịt trắng ít béo:</strong> Thịt lợn nạc vai, thịt lườn gia cầm bỏ da.</li>
        <li><strong>Bảo vệ tim mạch:</strong> Cá trắm, cá hồi, cá thu (nguồn Omega-3 dồi dào bảo vệ mạch máu).</li>
        <li>Dầu thực vật chưa no làm tăng cholesterol tốt HDL (dầu hạt cải, dầu lạc, dầu vừng).</li>
        <li>Thực phẩm có tác dụng an thần, hạ áp tự nhiên: Ngó sen, hạt sen, lá vông.</li>`;
      badFoods = `
        <li><strong>Tuyệt đối tránh đồ muối mặn:</strong> Dưa cải muối, cà muối, mắm tôm, mắm tép, tương mần, thịt cá muối mặn.</li>
        <li>Thực phẩm chế biến sẵn giàu muối: Giò lụa, chả, patê, xúc xích, thịt hộp, cá hộp, mì ăn liền.</li>
        <li>Mỡ động vật, nội tạng động vật (óc, lòng, gan, tim, cật), tôm to, lươn, chocolate chứa lượng cholesterol bão hòa rất cao.</li>
        <li>Đồ uống chứa cồn (rượu, bia); đồ uống có ga sinh hơi hoặc trà đặc, cà phê.</li>
        <li>Hạn chế các món canh nhiều nước do quá trình nấu đòi hỏi nêm nếm nhiều muối gia vị.</li>`;
      break;

    case 'ckd_predialysis':
      if (starvation !== 'severe') kcalPerKg = 30;
      proteinPerKg = 0.8;
      fluidPerKg = 20;
      medAdvice = `<strong>Mục tiêu:</strong> Hạn chế đạm nghiêm ngặt (protein thực tế từ 0.6-0.8g/kg) để làm chậm tiến triển suy thận và giảm ure máu, nhưng bắt buộc tăng calo từ nguồn glucid/lipid sạch để chống teo cơ dị hóa. Áp dụng ăn nhạt khi có phù hoặc tăng huyết áp (Natri < 2000mg/ngày).`;
      goodFoods = `
        <li><strong>Ngũ cốc đạm thấp, giàu calo:</strong> Miến dong, bột sắn dây, khoai củ (khoai môn, khoai sọ), bún, bánh đúc.</li>
        <li><strong>Chất béo sạch tăng năng lượng:</strong> Dầu thực vật tinh chế (dầu olive, dầu đậu nành) trộn salad hoặc kho nấu nhẹ.</li>
        <li><strong>Đạm động vật có mức độ:</strong> Thịt lợn nạc, thịt ngan, cá nạc hấp (giữ tỷ lệ đạm động vật > 50-60% để bảo đảm acid amin thiết yếu).</li>
        <li>Trái cây ít kali (nếu không tăng kali máu): Xoài chín, thanh long vừa phải.</li>
        <li>Sữa ít đạm chuyên biệt cho bệnh thận giai đoạn tiền lọc máu (Ví dụ: Nepro 1).</li>`;
      badFoods = `
        <li><strong>Thực phẩm nhiều Kali (khi nước tiểu < 1L hoặc kali máu tăng):</strong> Chuối tiêu, cam, mít, đu đủ, rau ngót, rau dền, cà rốt.</li>
        <li><strong>Thực phẩm giàu Phospho:</strong> Nước hầm xương, phủ tạng động vật, lòng đỏ trứng, phô mai, sữa bột thông thường.</li>
        <li>Thực phẩm nhiều natri, đồ chế biến sẵn, gia vị chấm đậm đặc.</li>`;
      break;

    case 'ckd_dialysis':
      if (starvation !== 'severe') kcalPerKg = 30;
      proteinPerKg = 1.2;
      fluidPerKg = 10;
      medAdvice = `<strong>Mục tiêu:</strong> Tăng cường đạm cao (1.2-1.3g/kg) để bù đắp lượng protein và acid amin bị hao hụt qua màng lọc màng bụng hoặc thận nhân tạo chu kỳ. <strong>Nguy cơ cực cao:</strong> Phải hạn chế lượng dịch uống và dịch canh cực kỳ nghiêm ngặt giữa các chu kỳ lọc để phòng phù phổi cấp.`;
      goodFoods = `
        <li><strong>Đạm động vật giá trị sinh học cao:</strong> Thịt lợn nạc, lòng trắng trứng gà (cung cấp nguồn protein tinh khiết hấp thu tối đa, ít phospho), cá nạc.</li>
        <li>Sữa giàu protein chuyên biệt cho người chạy thận nhân tạo (Ví dụ: Nepro 2).</li>
        <li>Chia thực đơn thành nhiều bữa ăn khô nhỏ trong ngày, hạn chế ăn canh lỏng.</li>`;
      badFoods = `
        <li>Uống quá nhiều nước, ăn nhiều canh húp, súp loãng, đồ lẩu nước.</li>
        <li>Trái cây/rau quả quá giàu kali và các nguồn thực phẩm giàu phospho cao (như lòng đỏ trứng, nước ninh xương).</li>`;
      break;

    case 'liver_failure':
      if (starvation !== 'severe') kcalPerKg = 30;
      proteinPerKg = 1.2;
      medAdvice = `<strong>Mục tiêu:</strong> Cung cấp đủ năng lượng và đạm quý để chống suy mòn nghiêm trọng, nương nhẹ chức năng chuyển hóa của gan, phòng báng bụng. <strong>Nguyên tắc bắt buộc:</strong> Phải chia nhỏ 5-6 bữa ăn và bổ sung một cữ ăn phụ nhẹ vào ban đêm (21h-22h) trước khi ngủ để chống hạ đường huyết đêm và chặn dị hóa cơ.`;
      goodFoods = `
        <li><strong>Lựa chọn hàng đầu:</strong> Thực phẩm tươi ngon, chế biến nương nhẹ (hấp, luộc, nấu loãng), tránh xào rán, không nấu cầu kỳ.</li>
        <li><strong>Đạm thực vật và đạm sữa dễ hấp thu:</strong> Đậu phụ, sữa đậu nành, cá nạc, sữa bò tươi rất tốt cho gan. Acid béo omega-3 tự nhiên từ thực vật/cá giúp bảo vệ gan.</li>
        <li><strong>Cữ phụ tối (22 giờ):</strong> Cháo lỏng, cốc sữa ấm hoặc bánh quy ngọt nhẹ.</li>
        <li>Tăng carbohydrate từ đường mật, tinh bột tinh, rau quả mềm ít xơ.</li>`;
      badFoods = `
        <li><strong>Tuyệt đối cấm rượu, bia</strong>; tránh ăn gia vị cay nóng kích ứng (ớt, tiêu).</li>
        <li>Hạn chế chất béo động vật, mỡ thừa, phủ tạng, các món chiên xào quay béo ngậy gây đầy bụng, khó tiêu.</li>
        <li>Tránh thức ăn lạ dễ gây dị ứng như hải sản, tôm, cua, ốc, sò, hến, đồ ăn sống.</li>
        <li>Hạn chế muối (ăn nhạt hoàn toàn) khi bệnh nhân có phù hoặc cổ chướng (báng bụng).</li>`;
      break;

    case 'gi_tract':
      if (starvation !== 'severe') kcalPerKg = 25;
      proteinPerKg = 1.0;
      medAdvice = `<strong>Mục tiêu:</strong> Giảm co bóp ống tiêu hóa, hạn chế bài tiết dịch vị/axit dạ dày quá mức, nương nhẹ bảo vệ niêm mạc loét. Chuyển đổi trạng thái từ lỏng hoàn toàn sang đặc dần khi tình trạng xuất huyết tiêu hóa đã được cầm máu ổn định.`;
      goodFoods = `
        <li><strong>Dạng chế biến:</strong> Thức ăn mềm, nhuyễn, nấu lỏng nhừ, giữ nhiệt độ ấm vừa phải (15-25 độ C) như cháo loãng, súp bột gạo, khoai tây nghiền, bánh mì mềm xốp.</li>
        <li><strong>Thực phẩm ít xơ sợi:</strong> Thịt nạc vai băm nhỏ rim nhạt, cá hấp xé nhỏ, trứng gà hấp chín kỹ.</li>
        <li>Đường bột từ ngũ cốc, mật ong để bao phủ bảo vệ niêm mạc.</li>
        <li>Sữa đã rút bớt kem/bơ hoặc sữa chua dịu nhẹ. Chia thành 6-8 bữa nhỏ/ngày, ăn chậm nhai kỹ.</li>`;
      badFoods = `
        <li><strong>Kích ứng niêm mạc:</strong> Đồ chua chát, dưa cà muối, giấm, ớt, tiêu, hành tỏi sống, nước ngọt sinh hơi có ga.</li>
        <li>Tránh ăn thịt từ súc vật non (chứa nhiều nucleoprotid làm kích thích tiết nhiều axit dịch vị).</li>
        <li>Thực phẩm dai cứng, nhiều gân xơ sợi thô.</li>
        <li>Cà phê, trà đặc, rượu bia.</li>`;
      break;

    case 'polymorbid':
    case 'surgery':
    default:
      if (starvation !== 'severe') kcalPerKg = 28;
      proteinPerKg = 1.3;
      medAdvice = `<strong>Mục tiêu:</strong> Đảm bảo năng lượng dồi dào chống teo cơ ở người cao tuổi hoặc đẩy nhanh quá trình liền sẹo, tái tạo mô lành vết mổ sau phẫu thuật. Chế độ ăn sau mổ cần tăng cường cao đạm và Vitamin C để vết mổ liền nhanh, giảm tỷ lệ toác vết mổ khi cắt chỉ.`;
      goodFoods = `
        <li><strong>Đa dạng hóa thực đơn:</strong> Phối hợp tối thiểu từ 5 trên 8 nhóm thực phẩm thiết yếu trong bữa ăn chính.</li>
        <li><strong>Tăng phục hồi:</strong> Thịt nạc heo, cá nạc, trứng tươi đun chín, nước quả chín (cam, bưởi, quýt), bắp cải, su hào chứa nhiều vitamin C và kẽm giúp liền vết thương.</li>
        <li>Thức ăn chế biến nhừ, mềm, cắt nhỏ dễ nhai nuốt (cháo dinh dưỡng, phở nhừ, súp).</li>
        <li>Bổ sung các cữ sữa phụ (ONS) giữa các bữa ăn chính để tăng đạm và canxi, ngăn loãng xương ở người già.</li>`;
      badFoods = `
        <li>Thức ăn dai, cứng, nhiều cơ sụn hoặc các hạt thô có nguy cơ gây nghẹn, hít sặc ở người già.</li>
        <li>Món ăn quá chiên rán, ngấy béo bão hòa động vật làm chậm tiêu hóa.</li>
        <li>Thực phẩm dưa cà muối mặn, đồ hộp chế biến sẵn.</li>`;
      break;
  }

  const totalCalories = Math.round(weight * kcalPerKg);
  const totalProtein = parseFloat((weight * proteinPerKg).toFixed(1));
  const proteinCalories = totalProtein * 4;
  const remainingCalories = totalCalories - proteinCalories;
  const totalCarb = Math.round((remainingCalories * 0.6) / 4);
  const totalLipid = Math.round((remainingCalories * 0.4) / 9);
  const totalFluid = Math.round(weight * fluidPerKg);

  return {
    totalCalories,
    totalProtein,
    totalCarb,
    totalLipid,
    totalFluid,
    medicalAdvice: medAdvice,
    goodFoods,
    badFoods,
    isRefeedingAlert
  };
}

export function calculateNutrition(): void {
  const weightInput = document.getElementById('patientWeight') as HTMLInputElement | null;
  const profileSelect = document.getElementById('clinicalProfile') as HTMLSelectElement | null;
  const starvationSelect = document.getElementById('starvationDuration') as HTMLSelectElement | null;

  const weight = parseFloat(weightInput?.value || '0') || 0;
  const profile = profileSelect?.value || 'sepsis';
  const starvation = starvationSelect?.value || 'none';

  const plan = computeNutritionPlan(weight, profile, starvation);
  if (!plan) return;

  const alertPanel = document.getElementById('refeedingAlertPanel');
  if (alertPanel) {
    alertPanel.style.display = plan.isRefeedingAlert ? 'block' : 'none';
  }

  const resCalories = document.getElementById('resCalories');
  const resProtein = document.getElementById('resProtein');
  const resFluid = document.getElementById('resFluid');
  const resCarb = document.getElementById('resCarb');
  const resLipid = document.getElementById('resLipid');
  const medicalAdvice = document.getElementById('medicalAdvice');
  const dietGoodList = document.getElementById('dietGoodList');
  const dietBadList = document.getElementById('dietBadList');

  if (resCalories) resCalories.innerText = plan.totalCalories.toString();
  if (resProtein) resProtein.innerText = plan.totalProtein.toString();
  if (resFluid) resFluid.innerText = plan.totalFluid.toString();
  if (resCarb) resCarb.innerText = plan.totalCarb + ' g';
  if (resLipid) resLipid.innerText = plan.totalLipid + ' g';

  if (medicalAdvice) medicalAdvice.innerHTML = plan.medicalAdvice;
  if (dietGoodList) dietGoodList.innerHTML = plan.goodFoods;
  if (dietBadList) dietBadList.innerHTML = plan.badFoods;
}

export function initNutritionStudio(): void {
  const inputs = document.querySelectorAll('#patientWeight, #clinicalProfile, #starvationDuration');
  inputs.forEach(input => {
    input.addEventListener('input', calculateNutrition);
    input.addEventListener('change', calculateNutrition);
  });

  calculateNutrition();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateInpatientNutrition = calculateNutrition;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNutritionStudio);
  } else {
    initNutritionStudio();
  }
}
