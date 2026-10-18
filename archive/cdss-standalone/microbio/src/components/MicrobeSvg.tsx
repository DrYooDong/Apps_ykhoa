import React from 'react';

interface MicrobeSvgProps {
  type: string;
  size?: number;
  className?: string;
  showLabels?: boolean;
}

export const MicrobeSvg: React.FC<MicrobeSvgProps> = ({
  type,
  size = 220,
  className = '',
  showLabels = true
}) => {
  // Rendering realistic microscopic 2D vectors based on textbook illustrations
  const renderMicroscopicView = () => {
    switch (type) {
      case 'gpc_clusters': // Staphylococcus aureus
        return (
          <g>
            {/* Background pinkish proteinaceous exudate and faint PMN shadow */}
            <rect width="200" height="200" fill="#fdf2f4" />
            <circle cx="150" cy="60" r="28" fill="#fbcfe8" opacity="0.4" />
            <path d="M140,50 Q155,45 160,60 Q150,75 135,65 Z" fill="#9d174d" opacity="0.3" />
            
            {/* Deep violet-purple clusters of cocci */}
            <g fill="#431407">
              {/* Cluster 1 */}
              {[
                {cx: 70, cy: 90, r: 6.5}, {cx: 82, cy: 88, r: 6.5}, {cx: 76, cy: 78, r: 6.5},
                {cx: 88, cy: 80, r: 6.5}, {cx: 94, cy: 92, r: 6.5}, {cx: 84, cy: 99, r: 6.5},
                {cx: 72, cy: 102, r: 6.5}, {cx: 60, cy: 94, r: 6.5}, {cx: 66, cy: 82, r: 6.5},
                {cx: 78, cy: 89, r: 6.8}, {cx: 88, cy: 104, r: 6.5}, {cx: 98, cy: 82, r: 6.5},
                {cx: 105, cy: 94, r: 6.5}, {cx: 100, cy: 104, r: 6.5}, {cx: 76, cy: 112, r: 6.5},
                {cx: 64, cy: 110, r: 6.5}, {cx: 90, cy: 70, r: 6.5}, {cx: 102, cy: 72, r: 6.5}
              ].map((c, i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#3b0764" stroke="#581c87" strokeWidth="1.2" />
              ))}

              {/* Smaller cluster 2 */}
              {[
                {cx: 140, cy: 135, r: 6.5}, {cx: 151, cy: 132, r: 6.5}, {cx: 146, cy: 144, r: 6.5},
                {cx: 158, cy: 141, r: 6.5}, {cx: 138, cy: 147, r: 6.5}, {cx: 149, cy: 152, r: 6.5}
              ].map((c, i) => (
                <circle key={'c2-'+i} cx={c.cx} cy={c.cy} r={c.r} fill="#3b0764" stroke="#581c87" strokeWidth="1.2" />
              ))}

              {/* Pairs and tetrads */}
              <circle cx="45" cy="45" r="6.5" fill="#3b0764" stroke="#581c87" strokeWidth="1" />
              <circle cx="56" cy="47" r="6.5" fill="#3b0764" stroke="#581c87" strokeWidth="1" />
              <circle cx="120" cy="35" r="6.5" fill="#3b0764" stroke="#581c87" strokeWidth="1" />
              <circle cx="40" cy="155" r="6.5" fill="#3b0764" stroke="#581c87" strokeWidth="1" />
            </g>
          </g>
        );

      case 'gpc_lancet': // Streptococcus pneumoniae
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* Encapsulated pairs (lancet diplococci with clear halo) */}
            {[
              {x: 70, y: 70, angle: 25},
              {x: 130, y: 110, angle: -40},
              {x: 60, y: 140, angle: 70},
              {x: 140, y: 45, angle: 10},
              {x: 100, y: 160, angle: -15}
            ].map((pair, idx) => (
              <g key={idx} transform={`translate(${pair.x}, ${pair.y}) rotate(${pair.angle})`}>
                {/* Clear halo (polysaccharide capsule) */}
                <ellipse cx="0" cy="0" rx="22" ry="14" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.5" opacity="0.95" />
                {/* Lancet coccus 1 */}
                <path d="M-11,0 C-11,-5 -4,-6 0,-2 C-4,6 -11,5 -11,0 Z" fill="#3b0764" stroke="#581c87" strokeWidth="0.8" />
                {/* Lancet coccus 2 (opposed pointed ends) */}
                <path d="M11,0 C11,-5 4,-6 0,-2 C4,6 11,5 11,0 Z" fill="#3b0764" stroke="#581c87" strokeWidth="0.8" />
              </g>
            ))}
            {/* PMN leukocyte outline in background */}
            <circle cx="100" cy="100" r="35" fill="#fce7f3" opacity="0.3" stroke="#f472b6" strokeWidth="0.8" strokeDasharray="3,3" />
            <path d="M85,90 Q95,85 105,92 Q115,105 100,115 Q90,110 85,90 Z" fill="#831843" opacity="0.25" />
          </g>
        );

      case 'gpc_chains': // Streptococcus pyogenes
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* Long flexible chains of deep purple cocci */}
            <g fill="#3b0764" stroke="#581c87" strokeWidth="1">
              {/* Chain 1 */}
              {[
                {cx: 30, cy: 60}, {cx: 41, cy: 64}, {cx: 52, cy: 70}, {cx: 63, cy: 75},
                {cx: 74, cy: 76}, {cx: 85, cy: 72}, {cx: 95, cy: 66}, {cx: 106, cy: 62},
                {cx: 118, cy: 64}, {cx: 129, cy: 69}, {cx: 139, cy: 76}, {cx: 149, cy: 84},
                {cx: 156, cy: 95}, {cx: 161, cy: 106}, {cx: 164, cy: 118}
              ].map((c, i) => (
                <circle key={'ch1-'+i} cx={c.cx} cy={c.cy} r="5.5" />
              ))}

              {/* Chain 2 */}
              {[
                {cx: 45, cy: 130}, {cx: 56, cy: 133}, {cx: 67, cy: 138}, {cx: 78, cy: 145},
                {cx: 86, cy: 154}, {cx: 93, cy: 165}, {cx: 100, cy: 175}
              ].map((c, i) => (
                <circle key={'ch2-'+i} cx={c.cx} cy={c.cy} r="5.5" />
              ))}

              {/* Short pairs */}
              <circle cx="130" cy="150" r="5.5" />
              <circle cx="140" cy="152" r="5.5" />
              <circle cx="80" cy="30" r="5.5" />
              <circle cx="90" cy="31" r="5.5" />
            </g>
          </g>
        );

      case 'gpc_chains_gbs': // Streptococcus agalactiae
      case 'gpc_enterococcus':
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g fill="#4a044e" stroke="#701a75" strokeWidth="1">
              {/* Ovoid pairs & short chains */}
              {[
                {cx: 50, cy: 50}, {cx: 61, cy: 53},
                {cx: 80, cy: 90}, {cx: 90, cy: 95}, {cx: 100, cy: 101}, {cx: 110, cy: 108},
                {cx: 140, cy: 70}, {cx: 150, cy: 74},
                {cx: 60, cy: 150}, {cx: 70, cy: 153}, {cx: 80, cy: 158},
                {cx: 135, cy: 140}, {cx: 145, cy: 145}
              ].map((c, i) => (
                <ellipse key={i} cx={c.cx} cy={c.cy} rx="6" ry="5" />
              ))}
            </g>
          </g>
        );

      case 'gnb_enteric': // E. coli
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* Plump straight pink/red Gram-negative rods */}
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="1">
              {[
                {x: 40, y: 50, w: 22, h: 9, rot: 15},
                {x: 75, y: 40, w: 24, h: 9, rot: -25},
                {x: 130, y: 65, w: 20, h: 9, rot: 40},
                {x: 50, y: 100, w: 25, h: 9, rot: 75},
                {x: 95, y: 90, w: 22, h: 9, rot: -10},
                {x: 140, y: 120, w: 26, h: 9, rot: 30},
                {x: 80, y: 140, w: 24, h: 9, rot: -45},
                {x: 120, y: 165, w: 21, h: 9, rot: 20},
                {x: 40, y: 160, w: 23, h: 9, rot: -5}
              ].map((r, i) => (
                <rect
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="4.5"
                  transform={`rotate(${r.rot}, ${r.x + r.w / 2}, ${r.y + r.h / 2})`}
                />
              ))}
            </g>
          </g>
        );

      case 'gnb_mucoid': // Klebsiella pneumoniae
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* Encapsulated plump pink rods with thick slime layer */}
            {[
              {x: 60, y: 60, rot: 20},
              {x: 120, y: 50, rot: -35},
              {x: 80, y: 110, rot: 10},
              {x: 140, y: 130, rot: 55},
              {x: 50, y: 150, rot: -20}
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${item.x}, ${item.y}) rotate(${item.rot})`}>
                {/* Thick mucinous capsule halo */}
                <rect x="-18" y="-12" width="36" height="24" rx="12" fill="#ffffff" stroke="#f43f5e" strokeWidth="1" opacity="0.9" />
                {/* Plump Gram-negative rod */}
                <rect x="-12" y="-6" width="24" height="12" rx="6" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
              </g>
            ))}
          </g>
        );

      case 'gnb_pseudomonas': // Pseudomonas aeruginosa
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* Slender Gram-negative bacilli with polar flagella */}
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.9">
              {[
                {x: 45, y: 45, w: 26, h: 6, rot: 25},
                {x: 110, y: 40, w: 28, h: 6, rot: -15},
                {x: 70, y: 95, w: 25, h: 6, rot: 60},
                {x: 135, y: 90, w: 27, h: 6, rot: 5},
                {x: 55, y: 150, w: 26, h: 6, rot: -30},
                {x: 125, y: 155, w: 29, h: 6, rot: 35}
              ].map((r, i) => (
                <g key={i}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    rx="3"
                    transform={`rotate(${r.rot}, ${r.x + r.w / 2}, ${r.y + r.h / 2})`}
                  />
                  {/* Faint polar flagellum wave */}
                  <path
                    d={`M${r.x},${r.y + 3} Q${r.x - 12},${r.y - 6} ${r.x - 22},${r.y + 2}`}
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                    opacity="0.7"
                  />
                </g>
              ))}
            </g>
          </g>
        );

      case 'gnb_salmonella': // Salmonella enterica
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#be123c" strokeWidth="1">
              {[
                {x: 50, y: 60, w: 24, h: 7.5, rot: -20},
                {x: 120, y: 55, w: 22, h: 7.5, rot: 30},
                {x: 80, y: 105, w: 25, h: 7.5, rot: 5},
                {x: 140, y: 120, w: 23, h: 7.5, rot: -40},
                {x: 45, y: 150, w: 24, h: 7.5, rot: 15}
              ].map((r, i) => (
                <rect
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="3.75"
                  transform={`rotate(${r.rot}, ${r.x + r.w / 2}, ${r.y + r.h / 2})`}
                />
              ))}
            </g>
          </g>
        );

      case 'gndc_intracellular': // Neisseria gonorrhoeae / meningitidis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* PMN leukocyte with segmented trilobed nucleus */}
            <circle cx="100" cy="100" r="65" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
            {/* Multilobed PMN nucleus (deep purple) */}
            <g fill="#701a75" opacity="0.85">
              <path d="M70,80 Q85,60 100,75 Q115,60 130,80 Q140,110 120,125 Q100,105 85,120 Q65,110 70,80 Z" />
            </g>
            {/* Intracellular kidney-bean diplococci (pink-red) */}
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.8">
              {[
                {x: 95, y: 95}, {x: 105, y: 102}, {x: 88, y: 108},
                {x: 115, y: 90}, {x: 80, y: 95}, {x: 110, y: 115},
                {x: 75, y: 75}, {x: 125, y: 80}
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                  {/* Opposing kidney beans */}
                  <path d="M-4,-2 C-4,-4 -1,-5 0,-2 C-1,1 -4,1 -4,-2 Z" />
                  <path d="M4,-2 C4,-4 1,-5 0,-2 C1,1 4,1 4,-2 Z" />
                </g>
              ))}
            </g>
            {/* Extracellular diplococci */}
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.8">
              <g transform="translate(35, 45)"><path d="M-3,-1 C-3,-3 0,-4 1,-1 Z"/><path d="M3,-1 C3,-3 0,-4 -1,-1 Z"/></g>
              <g transform="translate(170, 140)"><path d="M-3,-1 C-3,-3 0,-4 1,-1 Z"/><path d="M3,-1 C3,-3 0,-4 -1,-1 Z"/></g>
            </g>
          </g>
        );

      case 'gnb_coccobacilli': // Haemophilus influenzae
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* Tiny faint pleomorphic coccobacilli */}
            <g fill="#f43f5e" stroke="#e11d48" strokeWidth="0.7">
              {[
                {x: 30, y: 40, rx: 4, ry: 3}, {x: 45, y: 55, rx: 5, ry: 3},
                {x: 65, y: 45, rx: 4, ry: 3}, {x: 85, y: 60, rx: 6, ry: 3},
                {x: 110, y: 45, rx: 4, ry: 3}, {x: 135, y: 55, rx: 5, ry: 3},
                {x: 160, y: 40, rx: 4, ry: 3}, {x: 40, y: 95, rx: 5, ry: 3},
                {x: 75, y: 100, rx: 4, ry: 3}, {x: 100, y: 90, rx: 8, ry: 2.5} /* filament */,
                {x: 125, y: 105, rx: 4, ry: 3}, {x: 155, y: 95, rx: 5, ry: 3},
                {x: 50, y: 145, rx: 4, ry: 3}, {x: 75, y: 160, rx: 5, ry: 3},
                {x: 110, y: 150, rx: 4, ry: 3}, {x: 140, y: 155, rx: 6, ry: 3}
              ].map((c, i) => (
                <ellipse key={i} cx={c.x} cy={c.y} rx={c.rx} ry={c.ry} />
              ))}
            </g>
          </g>
        );

      case 'gpr_boxcar': // Bacillus anthracis
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* Large boxcar rods with square ends in chains */}
            <g fill="#3b0764" stroke="#581c87" strokeWidth="1.2">
              {/* Chain 1 */}
              {[
                {x: 25, y: 70}, {x: 55, y: 70}, {x: 85, y: 70}, {x: 115, y: 70}, {x: 145, y: 70}
              ].map((box, i) => (
                <g key={'b1-'+i}>
                  <rect x={box.x} y={box.y} width="28" height="13" rx="1.5" />
                  {/* Central oval uncolored spore */}
                  <ellipse cx={box.x + 14} cy={box.y + 6.5} rx="6" ry="3.5" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="0.8" />
                </g>
              ))}

              {/* Chain 2 */}
              {[
                {x: 35, y: 120}, {x: 65, y: 120}, {x: 95, y: 120}, {x: 125, y: 120}
              ].map((box, i) => (
                <g key={'b2-'+i}>
                  <rect x={box.x} y={box.y} width="28" height="13" rx="1.5" />
                  <ellipse cx={box.x + 14} cy={box.y + 6.5} rx="6" ry="3.5" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="0.8" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'gpr_spores': // Clostridium (with drumstick / terminal spores)
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* C. tetani tennis racquet drumstick rods */}
            {[
              {x: 50, y: 40, rot: 30},
              {x: 120, y: 55, rot: -45},
              {x: 70, y: 110, rot: 15},
              {x: 140, y: 130, rot: 60},
              {x: 40, y: 155, rot: -15}
            ].map((rod, i) => (
              <g key={i} transform={`translate(${rod.x}, ${rod.y}) rotate(${rod.rot})`}>
                {/* Rod stem */}
                <rect x="0" y="-3.5" width="36" height="7" rx="3.5" fill="#3b0764" stroke="#581c87" strokeWidth="1" />
                {/* Bulging round terminal spore */}
                <circle cx="36" cy="0" r="7.5" fill="#ede9fe" stroke="#3b0764" strokeWidth="1.5" />
              </g>
            ))}
          </g>
        );

      case 'afb_cords': // Mycobacterium tuberculosis
        return (
          <g>
            {/* Cyan-blue background from methylene blue counterstain */}
            <rect width="200" height="200" fill="#e0f2fe" />
            {/* Blue background cellular debris */}
            <path d="M20,30 Q60,20 80,50 Q40,80 20,30 Z" fill="#bae6fd" opacity="0.6" />
            <path d="M120,120 Q160,110 180,150 Q130,170 120,120 Z" fill="#bae6fd" opacity="0.6" />
            
            {/* Bright magenta / carbolfuchsin red beaded bacilli in serpentine cords */}
            <g fill="#be123c" stroke="#9f1239" strokeWidth="0.8">
              {/* Cord 1 */}
              {[
                {cx: 60, cy: 90}, {cx: 68, cy: 92}, {cx: 76, cy: 96}, {cx: 84, cy: 101},
                {cx: 92, cy: 104}, {cx: 100, cy: 102}, {cx: 108, cy: 98}, {cx: 116, cy: 94},
                {cx: 124, cy: 92}, {cx: 132, cy: 95}, {cx: 140, cy: 100}
              ].map((c, i) => (
                <circle key={'c1-'+i} cx={c.cx} cy={c.cy} r="2.8" />
              ))}
              
              {/* Interlacing cord 2 */}
              {[
                {cx: 80, cy: 82}, {cx: 88, cy: 86}, {cx: 95, cy: 92}, {cx: 102, cy: 97},
                {cx: 109, cy: 105}, {cx: 115, cy: 112}, {cx: 120, cy: 120}
              ].map((c, i) => (
                <circle key={'c2-'+i} cx={c.cx} cy={c.cy} r="2.8" />
              ))}

              {/* Individual beaded bacilli */}
              <g transform="translate(45, 140) rotate(20)">
                <ellipse cx="0" cy="0" rx="9" ry="2.2" />
                <circle cx="-5" cy="0" r="2.5" fill="#881337" />
                <circle cx="0" cy="0" r="2.5" fill="#881337" />
                <circle cx="5" cy="0" r="2.5" fill="#881337" />
              </g>

              <g transform="translate(140, 50) rotate(-35)">
                <ellipse cx="0" cy="0" rx="9" ry="2.2" />
                <circle cx="-5" cy="0" r="2.5" fill="#881337" />
                <circle cx="0" cy="0" r="2.5" fill="#881337" />
                <circle cx="5" cy="0" r="2.5" fill="#881337" />
              </g>
            </g>
          </g>
        );

      case 'yeast_india_ink': // Cryptococcus neoformans
        return (
          <g>
            {/* Dark black India ink background */}
            <rect width="200" height="200" fill="#18181b" />
            
            {/* Fine colloidal ink particles */}
            {Array.from({length: 40}).map((_, i) => (
              <circle
                key={i}
                cx={(i * 37) % 200}
                cy={(i * 53) % 200}
                r="1"
                fill="#27272a"
              />
            ))}

            {/* Central Giant Encapsulated Yeast 1 */}
            <g transform="translate(90, 95)">
              {/* Huge clear capsule halo (repels ink) */}
              <circle cx="0" cy="0" r="42" fill="#ffffff" opacity="0.95" />
              <circle cx="0" cy="0" r="42" fill="none" stroke="#e4e4e7" strokeWidth="1" />
              {/* Yeast cell body */}
              <circle cx="0" cy="0" r="18" fill="#a16207" stroke="#713f12" strokeWidth="1.5" />
              {/* Narrow-based bud */}
              <circle cx="16" cy="-14" r="9" fill="#ca8a04" stroke="#713f12" strokeWidth="1.2" />
              {/* Small nucleus/inclusion */}
              <circle cx="-3" cy="-3" r="4" fill="#713f12" />
            </g>

            {/* Smaller encapsulated yeast 2 */}
            <g transform="translate(160, 45)">
              <circle cx="0" cy="0" r="24" fill="#ffffff" opacity="0.95" />
              <circle cx="0" cy="0" r="10" fill="#a16207" />
            </g>
          </g>
        );

      case 'staph_cluster': // CoNS (S. epidermidis, S. saprophyticus, S. lugdunensis)
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g fill="#431407">
              {[
                {cx: 70, cy: 90, r: 6.5}, {cx: 82, cy: 88, r: 6.5}, {cx: 76, cy: 78, r: 6.5},
                {cx: 88, cy: 80, r: 6.5}, {cx: 94, cy: 92, r: 6.5}, {cx: 84, cy: 99, r: 6.5},
                {cx: 72, cy: 102, r: 6.5}, {cx: 60, cy: 94, r: 6.5}, {cx: 66, cy: 82, r: 6.5},
                {cx: 78, cy: 89, r: 6.8}, {cx: 88, cy: 104, r: 6.5}, {cx: 98, cy: 82, r: 6.5},
                {cx: 140, cy: 135, r: 6.5}, {cx: 151, cy: 132, r: 6.5}, {cx: 146, cy: 144, r: 6.5},
                {cx: 45, cy: 45, r: 6.5}, {cx: 56, cy: 47, r: 6.5}, {cx: 120, cy: 35, r: 6.5}
              ].map((c, i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#3b0764" stroke="#581c87" strokeWidth="1.2" />
              ))}
            </g>
          </g>
        );

      case 'listeria_coccobacillus': // Listeria monocytogenes
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g fill="#3b0764" stroke="#581c87" strokeWidth="0.9">
              {[
                {x: 45, y: 50, rot: 15}, {x: 80, y: 45, rot: -30},
                {x: 120, y: 65, rot: 40}, {x: 60, y: 95, rot: 80},
                {x: 100, y: 105, rot: -10}, {x: 140, y: 115, rot: 25},
                {x: 55, y: 145, rot: -45}, {x: 125, y: 150, rot: 35}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width="16" height="8" rx="4" transform={`rotate(${r.rot}, ${r.x+8}, ${r.y+4})`} />
              ))}
              <path d="M75,90 Q90,75 105,90" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M100,85 L105,90 L98,92" fill="#a855f7" />
            </g>
          </g>
        );

      case 'diphtheria_palisade': // Corynebacterium diphtheriae
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g>
              {[
                {x: 50, y: 60, rot: 45},
                {x: 68, y: 75, rot: -40},
                {x: 120, y: 70, rot: 10},
                {x: 135, y: 85, rot: -60},
                {x: 75, y: 130, rot: 20},
                {x: 95, y: 140, rot: -15},
                {x: 140, y: 140, rot: 50}
              ].map((rod, i) => (
                <g key={i} transform={`translate(${rod.x}, ${rod.y}) rotate(${rod.rot})`}>
                  <path d="M0,0 L26,0 Q32,5 26,10 L0,8 Z" fill="#3b0764" stroke="#581c87" strokeWidth="0.9" />
                  <circle cx="4" cy="4" r="3" fill="#be123c" />
                  <circle cx="24" cy="5" r="3.5" fill="#be123c" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'neisseria_diplococci': // N. meningitidis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <circle cx="95" cy="95" r="58" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.2" opacity="0.8" />
            <path d="M70,80 Q85,60 100,75 Q115,60 130,80 Q140,110 120,125 Q100,105 85,120 Q65,110 70,80 Z" fill="#701a75" opacity="0.6" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.8">
              {[
                {x: 90, y: 90}, {x: 105, y: 98}, {x: 85, y: 105},
                {x: 110, y: 85}, {x: 80, y: 90}, {x: 40, y: 45}, {x: 155, y: 145}
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                  <path d="M-4,-2 C-4,-4 -1,-5 0,-2 C-1,1 -4,1 -4,-2 Z" />
                  <path d="M4,-2 C4,-4 1,-5 0,-2 C1,1 4,1 4,-2 Z" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'moraxella_diplococci': // Moraxella catarrhalis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.8">
              {[
                {x: 60, y: 55}, {x: 130, y: 65}, {x: 85, y: 110},
                {x: 145, y: 125}, {x: 55, y: 150}, {x: 110, y: 160}
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                  <circle cx="-3.5" cy="0" r="4.5" />
                  <circle cx="3.5" cy="0" r="4.5" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'hacek_eikenella': // Eikenella corrodens
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <circle cx="85" cy="95" r="28" fill="#ffe4e6" stroke="#fda4af" strokeWidth="1" strokeDasharray="3,2" />
            <g fill="#f43f5e" stroke="#e11d48" strokeWidth="0.8">
              {[
                {x: 75, y: 85}, {x: 95, y: 90}, {x: 82, y: 105},
                {x: 40, y: 50}, {x: 140, y: 60}, {x: 135, y: 140}
              ].map((p, i) => (
                <rect key={i} x={p.x} y={p.y} width="16" height="5.5" rx="2.5" transform={`rotate(${i * 35}, ${p.x+8}, ${p.y+3})`} />
              ))}
            </g>
          </g>
        );

      case 'legionella_rod': // Legionella pneumophila
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <circle cx="100" cy="100" r="55" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.2" opacity="0.75" />
            <path d="M85,80 Q105,70 120,95 Q105,125 80,110 Z" fill="#9d174d" opacity="0.5" />
            <g fill="#fb7185" stroke="#f43f5e" strokeWidth="0.7">
              {[
                {x: 90, y: 90, len: 18}, {x: 105, y: 105, len: 22},
                {x: 85, y: 115, len: 14}, {x: 40, y: 50, len: 16},
                {x: 145, y: 135, len: 20}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.len} height="4.5" rx="2.2" transform={`rotate(${i * 40}, ${r.x+8}, ${r.y+2})`} />
              ))}
            </g>
          </g>
        );

      case 'bordetella_coccobacillus': // Bordetella pertussis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#f43f5e" stroke="#e11d48" strokeWidth="0.6">
              {Array.from({length: 24}).map((_, i) => (
                <circle
                  key={i}
                  cx={35 + ((i * 31) % 135)}
                  cy={35 + ((i * 47) % 135)}
                  r="3.2"
                />
              ))}
            </g>
          </g>
        );

      case 'shigella_rod': // Shigella dysenteriae
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <circle cx="60" cy="65" r="22" fill="#fce7f3" stroke="#f472b6" strokeWidth="0.9" opacity="0.6" />
            <circle cx="140" cy="130" r="20" fill="#fee2e2" stroke="#fca5a5" strokeWidth="0.8" opacity="0.7" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.9">
              {[
                {x: 45, y: 95, rot: 10}, {x: 80, y: 85, rot: -25},
                {x: 115, y: 95, rot: 45}, {x: 90, y: 130, rot: -10},
                {x: 130, y: 65, rot: 30}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width="20" height="7.5" rx="3.7" transform={`rotate(${r.rot}, ${r.x+10}, ${r.y+3.7})`} />
              ))}
            </g>
          </g>
        );

      case 'proteus_swarming': // Proteus mirabilis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.9">
              {[
                {x: 40, y: 60, w: 42, h: 7, rot: 25},
                {x: 85, y: 85, w: 50, h: 7, rot: -15},
                {x: 50, y: 130, w: 46, h: 7, rot: 40},
                {x: 110, y: 140, w: 40, h: 7, rot: -30}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="3.5" transform={`rotate(${r.rot}, ${r.x+r.w/2}, ${r.y+r.h/2})`} />
              ))}
            </g>
          </g>
        );

      case 'yersinia_bipolar': // Yersinia enterocolitica
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g>
              {[
                {x: 50, y: 55, rot: 20}, {x: 110, y: 60, rot: -35},
                {x: 75, y: 105, rot: 5}, {x: 135, y: 125, rot: 45},
                {x: 60, y: 155, rot: -15}
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rot})`}>
                  <rect x="0" y="0" width="22" height="9" rx="4.5" fill="#fecdd3" stroke="#e11d48" strokeWidth="0.8" />
                  <circle cx="4.5" cy="4.5" r="4" fill="#9f1239" />
                  <circle cx="17.5" cy="4.5" r="4" fill="#9f1239" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'vibrio_curved': // Vibrio cholerae / vulnificus
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.9">
              {[
                {x: 50, y: 55, rot: 10}, {x: 115, y: 50, rot: -30},
                {x: 80, y: 105, rot: 25}, {x: 135, y: 120, rot: -40},
                {x: 55, y: 150, rot: 45}
              ].map((v, i) => (
                <g key={i} transform={`translate(${v.x}, ${v.y}) rotate(${v.rot})`}>
                  <path d="M0,0 Q12,-6 18,6 Q10,12 0,0 Z" />
                  <path d="M18,6 Q26,10 32,4" fill="none" stroke="#fb7185" strokeWidth="0.8" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'campylobacter_jejuni':
      case 'campylobacter_seagull': // Campylobacter jejuni
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="none" stroke="#e11d48" strokeWidth="2.4" strokeLinecap="round">
              <path d="M40,55 Q55,42 68,52 Q82,42 95,55" />
              <path d="M105,95 Q120,82 133,92 Q148,82 160,95" />
              <path d="M45,135 Q60,122 73,132 Q88,122 100,135" />
              <path d="M130,45 Q142,35 140,50 Q138,65 150,55" />
              <path d="M70,165 Q82,155 80,170 Q78,185 90,175" />
            </g>
          </g>
        );

      case 'helicobacter_pylori': // Helicobacter pylori
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g>
              {[
                {x: 60, y: 65, rot: 25},
                {x: 115, y: 110, rot: -30},
                {x: 65, y: 145, rot: 5}
              ].map((hp, i) => (
                <g key={i} transform={`translate(${hp.x}, ${hp.y}) rotate(${hp.rot})`}>
                  <path d="M0,0 Q15,-10 28,0 Q40,10 52,0" fill="none" stroke="#e11d48" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M0,0 Q-8,-6 -14,-4" fill="none" stroke="#f43f5e" strokeWidth="1" />
                  <path d="M0,0 Q-10,0 -16,2" fill="none" stroke="#f43f5e" strokeWidth="1" />
                  <path d="M0,0 Q-8,6 -14,8" fill="none" stroke="#f43f5e" strokeWidth="1" />
                  <path d="M0,0 Q-6,10 -12,14" fill="none" stroke="#f43f5e" strokeWidth="1" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'acinetobacter_coccobacillus': // Acinetobacter baumannii
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#be123c" stroke="#881337" strokeWidth="0.9">
              {[
                {x: 50, y: 55}, {x: 62, y: 57},
                {x: 120, y: 65}, {x: 132, y: 67},
                {x: 80, y: 110}, {x: 92, y: 112},
                {x: 135, y: 135}, {x: 147, y: 137},
                {x: 55, y: 155}, {x: 67, y: 157}
              ].map((p, i) => (
                <ellipse key={i} cx={p.x} cy={p.y} rx="6.5" ry="5.5" />
              ))}
            </g>
          </g>
        );

      case 'stenotrophomonas_rod': // Stenotrophomonas maltophilia
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.9">
              {[
                {x: 45, y: 55, rot: 15}, {x: 110, y: 50, rot: -30},
                {x: 75, y: 105, rot: 50}, {x: 130, y: 115, rot: 10},
                {x: 55, y: 150, rot: -20}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width="22" height="7" rx="3.5" transform={`rotate(${r.rot}, ${r.x+11}, ${r.y+3.5})`} />
              ))}
            </g>
          </g>
        );

      case 'burkholderia_wrinkled': // Burkholderia pseudomallei
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g>
              {[
                {x: 50, y: 60, rot: 15}, {x: 115, y: 65, rot: -35},
                {x: 80, y: 110, rot: 25}, {x: 135, y: 130, rot: -10}
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rot})`}>
                  <rect x="0" y="0" width="24" height="8" rx="4" fill="#fecdd3" stroke="#e11d48" strokeWidth="0.8" />
                  <circle cx="4" cy="4" r="3.5" fill="#9f1239" />
                  <circle cx="20" cy="4" r="3.5" fill="#9f1239" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'clostridium_perfringens': // Clostridium perfringens
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g fill="#3b0764" stroke="#581c87" strokeWidth="1.2">
              {[
                {x: 35, y: 55, rot: 10}, {x: 95, y: 50, rot: -25},
                {x: 50, y: 105, rot: 35}, {x: 120, y: 115, rot: -10},
                {x: 45, y: 155, rot: -15}, {x: 110, y: 160, rot: 20}
              ].map((box, i) => (
                <rect key={i} x={box.x} y={box.y} width="32" height="13" rx="1" transform={`rotate(${box.rot}, ${box.x+16}, ${box.y+6.5})`} />
              ))}
            </g>
          </g>
        );

      case 'bacteroides_fragilis': // Bacteroides fragilis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#fb7185" stroke="#f43f5e" strokeWidth="0.7">
              {[
                {x: 45, y: 50, w: 18, h: 7}, {x: 115, y: 55, w: 22, h: 8},
                {x: 75, y: 100, w: 16, h: 7}, {x: 130, y: 115, w: 20, h: 7.5},
                {x: 50, y: 145, w: 19, h: 7}
              ].map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="3.5" transform={`rotate(${i * 30}, ${r.x+r.w/2}, ${r.y+r.h/2})`} />
              ))}
            </g>
          </g>
        );

      case 'treponema_spirochete': // Treponema pallidum
        return (
          <g>
            <rect width="200" height="200" fill="#0f172a" />
            {Array.from({length: 30}).map((_, i) => (
              <circle key={i} cx={(i * 37) % 200} cy={(i * 53) % 200} r="0.8" fill="#334155" />
            ))}
            <g fill="none" stroke="#e0f2fe" strokeWidth="1.2" strokeLinecap="round">
              <path d="M30,70 Q35,62 40,70 Q45,78 50,70 Q55,62 60,70 Q65,78 70,70 Q75,62 80,70 Q85,78 90,70 Q95,62 100,70 Q105,78 110,70 Q115,62 120,70 Q125,78 130,70" />
              <path d="M60,130 Q65,122 70,130 Q75,138 80,130 Q85,122 90,130 Q95,138 100,130 Q105,122 110,130 Q115,138 120,130 Q125,122 130,130 Q135,138 140,130 Q145,122 150,130 Q155,138 160,130" />
            </g>
          </g>
        );

      case 'chlamydia_elementary': // Chlamydia trachomatis
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <path d="M30,40 Q170,25 170,140 Q120,185 45,160 Z" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.2" />
            <ellipse cx="65" cy="80" rx="24" ry="18" fill="#701a75" opacity="0.65" />
            <circle cx="125" cy="115" r="32" fill="#881337" opacity="0.85" stroke="#4c0519" strokeWidth="1" />
            {Array.from({length: 20}).map((_, i) => (
              <circle key={i} cx={110 + ((i * 13) % 30)} cy={100 + ((i * 17) % 30)} r="1.5" fill="#fecdd3" />
            ))}
          </g>
        );

      case 'mycoplasma_fried_egg': // Mycoplasma pneumoniae
        return (
          <g>
            <rect width="200" height="200" fill="#f8fafc" />
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="55" fill="#fef08a" opacity="0.45" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="0" cy="0" r="22" fill="#ca8a04" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="-3" cy="-3" r="16" fill="#eab308" />
            </g>
          </g>
        );

      // --- NEW RICH MICROSCOPIC VECTORS ---

      case 'spore_rod': // Clostridioides difficile / C. botulinum (subterminal oval spores)
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* PMN leukocyte shadows */}
            <circle cx="160" cy="50" r="25" fill="#fbcfe8" opacity="0.4" />
            <g fill="#3b0764" stroke="#581c87" strokeWidth="1">
              {/* Rods with clear subterminal spore bulging */}
              {[
                { x: 50, y: 60, rot: 25, sporeAt: 'subterminal' },
                { x: 110, y: 40, rot: -40, sporeAt: 'terminal' },
                { x: 75, y: 110, rot: 10, sporeAt: 'subterminal' },
                { x: 135, y: 125, rot: 60, sporeAt: 'terminal' },
                { x: 45, y: 155, rot: -15, sporeAt: 'vegetative' },
                { x: 115, y: 165, rot: 30, sporeAt: 'subterminal' },
              ].map((r, i) => (
                <g key={i} transform={`translate(${r.x}, ${r.y}) rotate(${r.rot})`}>
                  {/* Vegetative bacillus body */}
                  <rect x="-16" y="-5" width="32" height="10" rx="5" fill="#4a044e" stroke="#701a75" strokeWidth="1" />
                  {/* Bulging clear endospore inside */}
                  {r.sporeAt === 'subterminal' && (
                    <ellipse cx="8" cy="0" rx="6" ry="4.5" fill="#ffffff" stroke="#a21caf" strokeWidth="0.8" />
                  )}
                  {r.sporeAt === 'terminal' && (
                    <circle cx="11" cy="0" r="6" fill="#ffffff" stroke="#a21caf" strokeWidth="0.8" />
                  )}
                </g>
              ))}
              {/* Free released refractile endospores */}
              <ellipse cx="35" cy="40" rx="5" ry="3.5" fill="#ffffff" stroke="#701a75" strokeWidth="1" />
              <ellipse cx="150" cy="85" rx="5" ry="3.5" fill="#ffffff" stroke="#701a75" strokeWidth="1" />
              <ellipse cx="90" cy="145" rx="5" ry="3.5" fill="#ffffff" stroke="#701a75" strokeWidth="1" />
            </g>
          </g>
        );

      case 'curved_rod': // Campylobacter jejuni / Vibrio vulnificus (gull-wing & comma shapes)
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round">
              {/* Classic gull-wing pairs (Campylobacter "S" / "V" shape) */}
              <path d="M40,55 Q50,45 60,55 Q70,65 80,55" />
              <path d="M120,40 Q130,30 140,40 Q150,50 160,40" />
              <path d="M70,110 Q80,100 90,110 Q100,120 110,110" />
              <path d="M125,120 Q135,110 145,120 Q155,130 165,120" />
              <path d="M50,155 Q60,145 70,155 Q80,165 90,155" />
              {/* Comma-shaped curved rods */}
              <path d="M100,75 Q112,70 115,85" />
              <path d="M45,95 Q52,85 60,95" />
              <path d="M130,160 Q142,152 148,165" />
              {/* Darting motility motion lines */}
              <path d="M85,55 L95,55" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M115,110 L125,110" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
            </g>
          </g>
        );

      case 'spirochete': // Treponema pallidum / Borrelia
        return (
          <g>
            {/* Darkfield / DFA-TP dark fluorescent contrast background */}
            <rect width="200" height="200" fill="#090d16" />
            {/* Extremely delicate, tightly coiled regular helical spirals */}
            <g stroke="#38bdf8" strokeWidth="1.6" fill="none" opacity="0.95" strokeLinecap="round">
              {/* Spirochete 1 */}
              <path d="M25,50 Q30,42 35,50 Q40,58 45,50 Q50,42 55,50 Q60,58 65,50 Q70,42 75,50 Q80,58 85,50 Q90,42 95,50 Q100,58 105,50 Q110,42 115,50 Q120,58 125,50" />
              {/* Spirochete 2 (angled) */}
              <path d="M60,110 Q66,102 72,110 Q78,118 84,110 Q90,102 96,110 Q102,118 108,110 Q114,102 120,110 Q126,118 132,110 Q138,102 144,110 Q150,118 156,110 Q162,102 168,110" />
              {/* Spirochete 3 (wavy) */}
              <path d="M35,160 Q41,152 47,160 Q53,168 59,160 Q65,152 71,160 Q77,168 83,160 Q89,152 95,160 Q101,168 107,160 Q113,152 119,160 Q125,168 131,160" />
              {/* Short spirochete fragments */}
              <path d="M120,75 Q125,68 130,75 Q135,82 140,75 Q145,68 150,75 Q155,82 160,75" />
            </g>
            {/* Faint fluorescence glow effect */}
            <circle cx="75" cy="50" r="1.5" fill="#a5f3fc" />
            <circle cx="114" cy="110" r="1.5" fill="#a5f3fc" />
          </g>
        );

      case 'school_of_fish': // Haemophilus ducreyi (chancroid - parallel tracks of coccobacilli)
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* PMN leukocyte background in purulent ulcer exudate */}
            <circle cx="60" cy="70" r="30" fill="#fce7f3" opacity="0.4" stroke="#f472b6" strokeWidth="0.8" strokeDasharray="3,3" />
            <circle cx="145" cy="135" r="28" fill="#fce7f3" opacity="0.4" stroke="#f472b6" strokeWidth="0.8" strokeDasharray="3,3" />
            {/* Multi-lobed PMN nuclei */}
            <path d="M50,65 Q58,58 66,66 Q70,75 62,80 Q52,78 50,65 Z" fill="#831843" opacity="0.3" />
            <path d="M138,130 Q145,125 152,132 Q155,142 145,145 Z" fill="#831843" opacity="0.3" />
            {/* Parallel chains of tiny Gram-negative coccobacilli (School of fish / railroad tracks) */}
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.6">
              {/* School 1 (top track) */}
              {[
                {cx: 80, cy: 75}, {cx: 90, cy: 76}, {cx: 100, cy: 77}, {cx: 110, cy: 78}, {cx: 120, cy: 79}, {cx: 130, cy: 80}
              ].map((c, i) => (
                <ellipse key={'t1-'+i} cx={c.cx} cy={c.cy} rx="4" ry="2.2" transform="rotate(5, 105, 77)" />
              ))}
              {/* School 1 (bottom parallel track) */}
              {[
                {cx: 82, cy: 83}, {cx: 92, cy: 84}, {cx: 102, cy: 85}, {cx: 112, cy: 86}, {cx: 122, cy: 87}, {cx: 132, cy: 88}
              ].map((c, i) => (
                <ellipse key={'t2-'+i} cx={c.cx} cy={c.cy} rx="4" ry="2.2" transform="rotate(5, 107, 85)" />
              ))}
              {/* School 2 (lower track) */}
              {[
                {cx: 40, cy: 120}, {cx: 50, cy: 122}, {cx: 60, cy: 125}, {cx: 70, cy: 128}, {cx: 80, cy: 130}
              ].map((c, i) => (
                <ellipse key={'t3-'+i} cx={c.cx} cy={c.cy} rx="4" ry="2.2" transform="rotate(15, 60, 125)" />
              ))}
              {[
                {cx: 42, cy: 127}, {cx: 52, cy: 129}, {cx: 62, cy: 132}, {cx: 72, cy: 135}, {cx: 82, cy: 137}
              ].map((c, i) => (
                <ellipse key={'t4-'+i} cx={c.cx} cy={c.cy} rx="4" ry="2.2" transform="rotate(15, 62, 132)" />
              ))}
              {/* Dispersed coccobacilli */}
              <ellipse cx="150" cy="60" rx="4" ry="2.2" />
              <ellipse cx="160" cy="65" rx="4" ry="2.2" />
              <ellipse cx="95" cy="155" rx="4" ry="2.2" />
              <ellipse cx="105" cy="157" rx="4" ry="2.2" />
            </g>
          </g>
        );

      case 'filament_rod': // Erysipelothrix rhusiopathiae (slender Gram+ filaments)
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g stroke="#3b0764" strokeWidth="2" fill="none" strokeLinecap="round">
              {/* Long slender filaments with tendency to form tangled hairpin loops */}
              <path d="M30,50 Q60,40 90,60 T140,45 T170,70" />
              <path d="M45,120 Q70,90 105,115 T155,100 T180,125" />
              <path d="M40,165 Q80,150 110,170 T160,155" />
              {/* Shorter slender rods */}
              <path d="M70,80 L95,78" />
              <path d="M125,140 L150,145" />
            </g>
            {/* Small granules along filaments */}
            <circle cx="60" cy="45" r="1.5" fill="#4a044e" />
            <circle cx="105" cy="115" r="1.5" fill="#4a044e" />
            <circle cx="110" cy="170" r="1.5" fill="#4a044e" />
          </g>
        );

      case 'bipolar_rod': // Pasteurella multocida / Yersinia enterocolitica (safety-pin bipolar staining)
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            {/* Gram-negative coccobacilli with darker intensely stained poles and faint clear center */}
            {[
              {x: 45, y: 55, rot: 20}, {x: 110, y: 45, rot: -35},
              {x: 75, y: 105, rot: 15}, {x: 140, y: 115, rot: 50},
              {x: 50, y: 155, rot: -10}, {x: 120, y: 160, rot: 25},
              {x: 160, y: 65, rot: 75}, {x: 35, y: 95, rot: -45}
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${item.x}, ${item.y}) rotate(${item.rot})`}>
                {/* Rod capsule outline */}
                <rect x="-11" y="-5.5" width="22" height="11" rx="5.5" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="0.8" />
                {/* Deeply stained dark red-purple poles (Bipolar / Safety pin appearance) */}
                <circle cx="-6.5" cy="0" r="4" fill="#9f1239" />
                <circle cx="6.5" cy="0" r="4" fill="#9f1239" />
                {/* Faint clear central zone */}
                <rect x="-2.5" y="-4.5" width="5" height="9" fill="#fff1f2" opacity="0.9" />
              </g>
            ))}
          </g>
        );

      case 'fusiform_rod': // Capnocytophaga canimorsus / Fusobacterium (slender tapered spindle rods)
        return (
          <g>
            <rect width="200" height="200" fill="#fff1f2" />
            <g fill="#e11d48" stroke="#9f1239" strokeWidth="0.8">
              {[
                {x: 45, y: 55, rot: 25}, {x: 120, y: 45, rot: -20},
                {x: 80, y: 105, rot: 5}, {x: 145, y: 115, rot: 45},
                {x: 55, y: 155, rot: -30}, {x: 125, y: 165, rot: 30}
              ].map((item, idx) => (
                <g key={idx} transform={`translate(${item.x}, ${item.y}) rotate(${item.rot})`}>
                  {/* Fusiform pointed needle-shaped spindle */}
                  <path d="M-18,0 Q-9,-4 0,-4 Q9,-4 18,0 Q9,4 0,4 Q-9,4 -18,0 Z" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'intracellular_rod': // Bartonella henselae (Warthin-Starry silver stain / intracellular clumps)
        return (
          <g>
            {/* Golden-tan tissue background of silver-stained lymph node */}
            <rect width="200" height="200" fill="#fef3c7" />
            {/* Endothelial cell outline */}
            <ellipse cx="100" cy="100" rx="70" ry="55" fill="#fde68a" stroke="#d97706" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="22" fill="#b45309" opacity="0.3" />
            {/* Granular silver precipitates and black pleomorphic bacilli clumps */}
            <g fill="#1c1917">
              {Array.from({length: 35}).map((_, i) => (
                <ellipse
                  key={i}
                  cx={75 + ((i * 19) % 55)}
                  cy={75 + ((i * 23) % 50)}
                  rx={1.5 + (i % 2)}
                  ry={3.5 + (i % 2)}
                  transform={`rotate(${(i * 35) % 360}, ${75 + ((i * 19) % 55)}, ${75 + ((i * 23) % 50)})`}
                />
              ))}
            </g>
          </g>
        );

      case 'amoeba': // Acanthamoeba spp. (trophozoite with acanthopodia and double-walled cyst)
        return (
          <g>
            <rect width="200" height="200" fill="#f8fafc" />
            {/* Trophozoite with spike-like spine pseudopodia (Acanthopodia) */}
            <g transform="translate(70, 80)">
              <path
                d="M-30,-10 L-22,-20 L-10,-18 L0,-32 L12,-20 L28,-22 L25,-5 L35,8 L20,20 L15,32 L-5,25 L-20,30 L-25,15 L-35,5 Z"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              {/* Large prominent vesicular nucleus with huge dark central karyosome ("Bull's eye") */}
              <circle cx="-2" cy="0" r="11" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
              <circle cx="-2" cy="0" r="5" fill="#0f172a" />
              {/* Contractile vacuoles */}
              <circle cx="12" cy="10" r="4.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
              <circle cx="-12" cy="-8" r="3.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            </g>
            {/* Double-walled Star-shaped Cyst */}
            <g transform="translate(145, 140)">
              {/* Wrinkled polyhedral outer wall (Ectocyst) */}
              <polygon points="0,-22 18,-12 22,10 5,22 -18,15 -22,-5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Round inner wall (Endocyst) */}
              <circle cx="0" cy="0" r="14" fill="#fef9c3" stroke="#eab308" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="3.5" fill="#a16207" />
            </g>
          </g>
        );

      case 'aspergillus_conidiophore': // Aspergillus fumigatus / niger (conidiophore with phialides)
        return (
          <g>
            <rect width="200" height="200" fill="#f8fafc" />
            {/* Septate hypha branching at acute 45 degrees */}
            <path d="M20,180 Q60,170 90,140" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M70,155 L120,175" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Conidiophore stalk */}
            <path d="M90,140 L100,85" stroke="#16a34a" strokeWidth="4" fill="none" />
            {/* Dome-shaped Vesicle */}
            <ellipse cx="100" cy="75" rx="16" ry="14" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            {/* Phialides and chains of conidia radiating like a flower */}
            {Array.from({length: 14}).map((_, i) => {
              const angle = (i * 20 - 40) * (Math.PI / 180);
              const x1 = 100 + Math.sin(angle) * 16;
              const y1 = 75 - Math.cos(angle) * 14;
              const x2 = 100 + Math.sin(angle) * 32;
              const y2 = 75 - Math.cos(angle) * 30;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#166534" strokeWidth="1.2" strokeDasharray="3,2" />
                  <circle cx={x2} cy={y2} r="2.5" fill="#14532d" />
                </g>
              );
            })}
          </g>
        );

      case 'mold_multicell': // Mucor / Rhizopus / General mold hyphae
        return (
          <g>
            <rect width="200" height="200" fill="#f8fafc" />
            {/* Broad non-septate / pauci-septate ribbon hyphae branching at 90 degrees */}
            <g stroke="#047857" strokeWidth="4" fill="none" strokeLinecap="round">
              <path d="M30,170 Q70,140 100,100 T170,50" />
              <path d="M100,100 L160,130" />
              <path d="M60,145 L40,95" />
            </g>
            {/* Sporangium bulb */}
            <circle cx="170" cy="50" r="16" fill="#065f46" stroke="#047857" strokeWidth="1.5" />
            <circle cx="170" cy="50" r="10" fill="#10b981" />
          </g>
        );

      case 'parasite_egg': // Ascaris / Helminth ova
        return (
          <g>
            <rect width="200" height="200" fill="#fefce8" />
            {/* Golden-brown bile-stained thick rough mammillated shell */}
            <g transform="translate(100, 100)">
              <ellipse cx="0" cy="0" rx="46" ry="34" fill="#a16207" stroke="#713f12" strokeWidth="3" />
              {/* Mammillated albuminous tubercles along border */}
              {Array.from({length: 16}).map((_, i) => {
                const a = (i * 22.5) * (Math.PI / 180);
                return (
                  <circle key={i} cx={Math.cos(a) * 44} cy={Math.sin(a) * 32} r="6" fill="#854d0e" />
                );
              })}
              {/* Internal unsegmented ovum mass */}
              <ellipse cx="0" cy="0" rx="30" ry="20" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
              <ellipse cx="-4" cy="-2" rx="16" ry="10" fill="#eab308" />
            </g>
          </g>
        );

      case 'parasite_trophozoite': // Giardia / Trichomonas
        return (
          <g>
            <rect width="200" height="200" fill="#f8fafc" />
            {/* Tear-drop shaped trophozoite with two nuclei resembling a face */}
            <g transform="translate(100, 95)">
              <path d="M-30,-25 Q0,-45 30,-25 Q35,20 0,60 Q-35,20 -30,-25 Z" fill="#c084fc" stroke="#7e22ce" strokeWidth="1.5" />
              {/* Two oval nuclei with central endosomes */}
              <ellipse cx="-12" cy="-10" rx="8" ry="11" fill="#f3e8ff" stroke="#6b21a8" strokeWidth="1" />
              <circle cx="-12" cy="-10" r="3" fill="#581c87" />
              <ellipse cx="12" cy="-10" rx="8" ry="11" fill="#f3e8ff" stroke="#6b21a8" strokeWidth="1" />
              <circle cx="12" cy="-10" r="3" fill="#581c87" />
              {/* Axostyle & median bodies */}
              <line x1="0" y1="-35" x2="0" y2="55" stroke="#6b21a8" strokeWidth="1.5" />
              {/* Flagella pairs */}
              <path d="M0,60 Q15,80 30,90" fill="none" stroke="#9333ea" strokeWidth="1.2" />
              <path d="M0,60 Q-15,80 -30,90" fill="none" stroke="#9333ea" strokeWidth="1.2" />
            </g>
          </g>
        );

      case 'virus_enveloped': // Enveloped virus (Influenza / SARS-CoV-2 / HSV)
        return (
          <g>
            <rect width="200" height="200" fill="#0f172a" />
            <g transform="translate(100, 100)">
              {/* Lipid bilayer spherical envelope */}
              <circle cx="0" cy="0" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              {/* Spike glycoprotein projections */}
              {Array.from({length: 18}).map((_, i) => {
                const a = (i * 20) * (Math.PI / 180);
                const x1 = Math.cos(a) * 45;
                const y1 = Math.sin(a) * 45;
                const x2 = Math.cos(a) * 62;
                const y2 = Math.sin(a) * 62;
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f43f5e" strokeWidth="2.5" />
                    <circle cx={x2} cy={y2} r="3.5" fill="#fb7185" />
                  </g>
                );
              })}
              {/* Internal nucleocapsid coil */}
              <path d="M-20,-15 Q0,-30 20,-15 Q25,10 0,20 Q-25,10 -10,-5" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,2" />
            </g>
          </g>
        );

      case 'bacillus_anthracis_chain': // B. anthracis chains
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            {/* Long bamboo-stick serpentine chains of square-ended Gram+ rods */}
            <g fill="#3b0764" stroke="#581c87" strokeWidth="1">
              {[
                {x: 25, y: 70}, {x: 55, y: 70}, {x: 85, y: 70}, {x: 115, y: 70}, {x: 145, y: 70}
              ].map((b, i) => (
                <rect key={'b1-'+i} x={b.x} y={b.y} width="28" height="12" rx="1.5" />
              ))}
              {[
                {x: 40, y: 120}, {x: 70, y: 120}, {x: 100, y: 120}, {x: 130, y: 120}
              ].map((b, i) => (
                <rect key={'b2-'+i} x={b.x} y={b.y} width="28" height="12" rx="1.5" />
              ))}
            </g>
            {/* Non-staining poly-D-glutamic acid capsule clear halo */}
            <rect x="20" y="65" width="158" height="22" rx="6" fill="none" stroke="#f472b6" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
            <rect x="35" y="115" width="128" height="22" rx="6" fill="none" stroke="#f472b6" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
          </g>
        );

      case 'enterococcus_chain': // Enterococcus ovoid pairs and short chains
        return (
          <g>
            <rect width="200" height="200" fill="#fdf2f4" />
            <g fill="#4a044e" stroke="#701a75" strokeWidth="1">
              {[
                {cx: 50, cy: 55, rx: 6, ry: 4.5, rot: 30},
                {cx: 60, cy: 62, rx: 6, ry: 4.5, rot: 30},
                {cx: 110, cy: 80, rx: 6, ry: 4.5, rot: -20},
                {cx: 121, cy: 76, rx: 6, ry: 4.5, rot: -20},
                {cx: 132, cy: 72, rx: 6, ry: 4.5, rot: -20},
                {cx: 65, cy: 135, rx: 6, ry: 4.5, rot: 45},
                {cx: 74, cy: 145, rx: 6, ry: 4.5, rot: 45},
                {cx: 140, cy: 140, rx: 6, ry: 4.5, rot: -10},
                {cx: 151, cy: 138, rx: 6, ry: 4.5, rot: -10}
              ].map((c, i) => (
                <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} transform={`rotate(${c.rot}, ${c.cx}, ${c.cy})`} />
              ))}
            </g>
          </g>
        );

      default:
        return (
          <g>
            <rect width="200" height="200" fill="#f1f5f9" />
            {/* Sensible default: mixed bacterial morphotype */}
            <circle cx="85" cy="85" r="7" fill="#4338ca" />
            <circle cx="97" cy="85" r="7" fill="#4338ca" />
            <rect x="120" y="110" width="22" height="8" rx="4" fill="#e11d48" />
            <circle cx="60" cy="130" r="6" fill="#4338ca" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="rounded-full shadow-inner border-4 border-slate-300 bg-slate-900 overflow-hidden"
      >
        <clipPath id={`clip-${type}`}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
        <g clipPath={`url(#clip-${type})`}>
          {renderMicroscopicView()}
        </g>
        {/* Microscope reticle overlay ring */}
        <circle cx="100" cy="100" r="98" fill="none" stroke="#cbd5e1" strokeWidth="2" opacity="0.6" />
      </svg>
      {showLabels && (
        <span className="mt-1.5 text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">
          ×1000 Oil Immersion
        </span>
      )}
    </div>
  );
};

interface AgarPlateSvgProps {
  mediaType: 'SBA' | 'SBA_ALPHA' | 'MAC_LF' | 'MAC_NLF' | 'CHOC' | 'PROTEUS_SWARM' | 'PSEUDO_GREEN' | 'TCBS_YELLOW' | 'TCBS_GREEN' | 'CCFA' | 'HE_H2S' | 'SDA_YEAST' | 'SDA_MOLD';
  size?: number;
  className?: string;
  label?: string;
}

export const AgarPlateSvg: React.FC<AgarPlateSvgProps> = ({
  mediaType,
  size = 180,
  className = '',
  label
}) => {
  const getMediaRender = () => {
    switch (mediaType) {
      case 'SBA': // Sheep Blood Agar with Beta-hemolysis (Clear zone)
        return (
          <g>
            {/* Blood red agar background */}
            <circle cx="100" cy="100" r="90" fill="#991b1b" />
            {/* Clear hemolytic halos */}
            <circle cx="80" cy="70" r="22" fill="#ef4444" opacity="0.85" />
            <circle cx="125" cy="90" r="20" fill="#ef4444" opacity="0.85" />
            <circle cx="85" cy="130" r="18" fill="#ef4444" opacity="0.85" />
            {/* Colonies in center */}
            <circle cx="80" cy="70" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="125" cy="90" r="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="85" cy="130" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            {/* Streak lines */}
            <path d="M40,50 Q100,25 150,55" stroke="#fef08a" strokeWidth="1.5" fill="none" opacity="0.7" />
          </g>
        );

      case 'SBA_ALPHA': // Sheep Blood Agar with Alpha-hemolysis (Olive-green zone)
        return (
          <g>
            <circle cx="100" cy="100" r="90" fill="#991b1b" />
            {/* Olive-green brownish alpha hemolysis halos */}
            <circle cx="80" cy="70" r="22" fill="#4d7c0f" opacity="0.75" />
            <circle cx="125" cy="90" r="20" fill="#4d7c0f" opacity="0.75" />
            <circle cx="85" cy="130" r="18" fill="#4d7c0f" opacity="0.75" />
            {/* Draughtsman / umbilicate indented colonies */}
            <circle cx="80" cy="70" r="8" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1" />
            <circle cx="80" cy="70" r="3" fill="#365314" opacity="0.4" />
            <circle cx="125" cy="90" r="7" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1" />
            <circle cx="85" cy="130" r="6" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1" />
            <path d="M40,50 Q100,25 150,55" stroke="#a3e635" strokeWidth="1.2" fill="none" opacity="0.6" />
          </g>
        );

      case 'MAC_LF': // MacConkey Lactose Fermenter (E. coli pink colonies with halo)
        return (
          <g>
            {/* Amber-tan MacConkey base */}
            <circle cx="100" cy="100" r="90" fill="#fcd34d" />
            {/* Pink precipitated bile salt halos */}
            <ellipse cx="85" cy="80" rx="28" ry="24" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="120" cy="115" rx="25" ry="20" fill="#f43f5e" opacity="0.4" />
            {/* Dark hot-pink colonies */}
            <circle cx="85" cy="80" r="10" fill="#e11d48" stroke="#9f1239" strokeWidth="1" />
            <circle cx="120" cy="115" r="9" fill="#e11d48" stroke="#9f1239" strokeWidth="1" />
            <circle cx="65" cy="120" r="7" fill="#e11d48" />
            <circle cx="135" cy="70" r="6" fill="#e11d48" />
          </g>
        );

      case 'MAC_NLF': // MacConkey Non-Lactose Fermenter (Colorless/translucent)
        return (
          <g>
            {/* Amber-tan MacConkey base */}
            <circle cx="100" cy="100" r="90" fill="#fde68a" />
            {/* Clear translucent amber colonies */}
            <circle cx="80" cy="80" r="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1" opacity="0.9" />
            <circle cx="125" cy="95" r="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" opacity="0.9" />
            <circle cx="85" cy="130" r="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1" opacity="0.9" />
          </g>
        );

      case 'CHOC': // Chocolate Agar
        return (
          <g>
            {/* Brown chocolate agar */}
            <circle cx="100" cy="100" r="90" fill="#78350f" />
            {/* Greyish tan fastidious colonies */}
            <circle cx="75" cy="75" r="6" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.8" />
            <circle cx="95" cy="70" r="5.5" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.8" />
            <circle cx="120" cy="85" r="6" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.8" />
            <circle cx="85" cy="120" r="7" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.8" />
            <circle cx="115" cy="125" r="6" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.8" />
          </g>
        );

      case 'PROTEUS_SWARM': // Proteus swarming rings on blood agar
        return (
          <g>
            <circle cx="100" cy="100" r="90" fill="#991b1b" />
            {/* Concentric rippling swarming waves */}
            <circle cx="100" cy="100" r="20" fill="none" stroke="#fed7aa" strokeWidth="3" opacity="0.8" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#fed7aa" strokeWidth="2.5" opacity="0.6" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.4" />
            <circle cx="100" cy="100" r="8" fill="#ffedd5" />
          </g>
        );

      case 'PSEUDO_GREEN': // Pseudomonas pyocyanin green pigment
        return (
          <g>
            <circle cx="100" cy="100" r="90" fill="#991b1b" />
            {/* Diffusible green pigment */}
            <circle cx="100" cy="100" r="70" fill="#047857" opacity="0.75" />
            {/* Flat spreading colonies with metallic sheen */}
            <path d="M70,80 Q90,60 110,80 Q130,100 110,120 Q90,140 70,120 Z" fill="#34d399" stroke="#059669" strokeWidth="1.5" />
            <ellipse cx="100" cy="100" rx="15" ry="10" fill="#6ee7b7" opacity="0.9" />
          </g>
        );

      case 'TCBS_YELLOW': // Vibrio cholerae yellow colonies on TCBS
        return (
          <g>
            {/* Deep dark green TCBS base */}
            <circle cx="100" cy="100" r="90" fill="#064e3b" />
            {/* Large vibrant yellow sucrose-fermenting colonies */}
            <circle cx="80" cy="75" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="125" cy="95" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="85" cy="130" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="130" cy="135" r="8" fill="#facc15" />
          </g>
        );

      case 'TCBS_GREEN': // Vibrio vulnificus blue-green colonies on TCBS
        return (
          <g>
            <circle cx="100" cy="100" r="90" fill="#064e3b" />
            {/* Translucent blue-green non-sucrose fermenting colonies */}
            <circle cx="80" cy="75" r="12" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.2" opacity="0.9" />
            <circle cx="125" cy="95" r="11" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.2" opacity="0.9" />
            <circle cx="85" cy="130" r="9" fill="#14b8a6" stroke="#0f766e" strokeWidth="1" opacity="0.9" />
          </g>
        );

      case 'CCFA': // Clostridioides difficile yellow ground-glass on CCFA
        return (
          <g>
            {/* Dark anaerobic CCFA base */}
            <circle cx="100" cy="100" r="90" fill="#1e1b4b" />
            {/* Yellow ground-glass colonies with yellow-green fluorescence halo */}
            <circle cx="80" cy="80" r="16" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" opacity="0.9" />
            <circle cx="80" cy="80" r="22" fill="#fef9c3" opacity="0.25" />
            <circle cx="125" cy="110" r="14" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" opacity="0.9" />
            <circle cx="125" cy="110" r="19" fill="#fef9c3" opacity="0.25" />
          </g>
        );

      case 'HE_H2S': // Hektoen Enteric with black H2S centers (Salmonella)
        return (
          <g>
            {/* Blue-green Hektoen Enteric base */}
            <circle cx="100" cy="100" r="90" fill="#0d9488" />
            {/* Blue-green colonies with glossy pitch-black centers */}
            <circle cx="80" cy="75" r="13" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1" />
            <circle cx="80" cy="75" r="6.5" fill="#09090b" />
            <circle cx="125" cy="95" r="11" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1" />
            <circle cx="125" cy="95" r="5.5" fill="#09090b" />
            <circle cx="85" cy="130" r="10" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1" />
            <circle cx="85" cy="130" r="5" fill="#09090b" />
          </g>
        );

      case 'SDA_YEAST': // Sabouraud Dextrose Agar yeast colonies
        return (
          <g>
            {/* Creamy amber Sabouraud base */}
            <circle cx="100" cy="100" r="90" fill="#fed7aa" />
            {/* Creamy pasty opaque white yeast colonies */}
            <circle cx="80" cy="75" r="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="120" cy="90" r="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="85" cy="125" r="9" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="130" cy="130" r="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          </g>
        );

      case 'SDA_MOLD': // Sabouraud Dextrose Agar mold colonies
        return (
          <g>
            <circle cx="100" cy="100" r="90" fill="#fed7aa" />
            {/* Velvety spreading green-black fuzzy mold lawn with white border */}
            <circle cx="100" cy="100" r="65" fill="#14532d" stroke="#f8fafc" strokeWidth="3" />
            <circle cx="100" cy="100" r="40" fill="#052e16" />
            {/* Radial furrows */}
            {Array.from({length: 8}).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * 45) * Math.PI / 180) * 60}
                y2={100 + Math.sin((i * 45) * Math.PI / 180) * 60}
                stroke="#166534"
                strokeWidth="1.5"
                opacity="0.6"
              />
            ))}
          </g>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-md">
        {/* Petri Dish Glass Rim */}
        <circle cx="100" cy="100" r="98" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" opacity="0.9" />
        <circle cx="100" cy="100" r="95" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        {getMediaRender()}
        {/* Glass reflection highlight */}
        <path d="M40,40 Q100,10 160,40" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.35" />
      </svg>
      {label && (
        <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
          {label}
        </span>
      )}
    </div>
  );
};

// Helper to determine the best colony media presentation for any pathogen
export function getColonyMediaForPathogen(pathogen: {
  id: string;
  colony?: { bloodAgar?: string; macConkeyAgar?: string };
  biochemicals?: { lactoseFermentation?: string; h2s?: string };
}): {
  mediaType: AgarPlateSvgProps['mediaType'];
  label: string;
} {
  const id = pathogen.id;
  if (id === 's_aureus') return { mediaType: 'SBA', label: 'SBA: Golden Beta-hemolytic' };
  if (id === 's_pyogenes' || id === 's_agalactiae') return { mediaType: 'SBA', label: 'SBA: Clear Beta-hemolysis' };
  if (id === 's_pneumoniae') return { mediaType: 'SBA_ALPHA', label: 'SBA: Green Alpha-hemolytic' };
  if (id === 'p_aeruginosa') return { mediaType: 'PSEUDO_GREEN', label: 'SBA: Pyocyanin Green Sheen' };
  if (id === 'proteus_mirabilis') return { mediaType: 'PROTEUS_SWARM', label: 'SBA: Swarming Waves' };
  if (id === 'e_coli' || id === 'k_pneumoniae') return { mediaType: 'MAC_LF', label: 'MAC: Lactose Fermenter (Hot Pink)' };
  if (id === 'salmonella_typhi' || id === 'salmonella_enterica') return { mediaType: 'HE_H2S', label: 'HE / XLD: Black Center H2S+' };
  if (id === 'shigella_dysenteriae') return { mediaType: 'MAC_NLF', label: 'MAC: Translucent NLF' };
  if (id === 'v_cholerae') return { mediaType: 'TCBS_YELLOW', label: 'TCBS: Large Yellow Colonies' };
  if (id === 'v_vulnificus') return { mediaType: 'TCBS_GREEN', label: 'TCBS: Blue-Green Colonies' };
  if (id === 'c_difficile') return { mediaType: 'CCFA', label: 'CCFA: Chartreuse Ground-Glass' };
  if (id === 'h_influenzae' || id === 'h_ducreyi' || id === 'n_gonorrhoeae') return { mediaType: 'CHOC', label: 'CHOC: Tan Fastidious Colonies' };
  if (id === 'c_albicans' || id === 'c_neoformans') return { mediaType: 'SDA_YEAST', label: 'SDA: Creamy Yeast Colonies' };
  if (id.includes('aspergillus') || id.includes('mold')) return { mediaType: 'SDA_MOLD', label: 'SDA: Velvety Mold Lawn' };

  // Fallback based on MacConkey or Blood agar
  if (pathogen.biochemicals?.lactoseFermentation === '+') {
    return { mediaType: 'MAC_LF', label: 'MAC: Pink Lactose Fermenter' };
  }
  if (pathogen.colony?.macConkeyAgar?.toLowerCase().includes('colorless') || pathogen.colony?.macConkeyAgar?.toLowerCase().includes('translucent')) {
    return { mediaType: 'MAC_NLF', label: 'MAC: Colorless Translucent' };
  }
  if (pathogen.colony?.bloodAgar?.toLowerCase().includes('alpha')) {
    return { mediaType: 'SBA_ALPHA', label: 'SBA: Alpha-hemolysis' };
  }
  return { mediaType: 'SBA', label: 'SBA: Standard Blood Agar' };
}

interface BiochemicalReactionSvgProps {
  testType: 'catalase' | 'oxidase' | 'coagulase' | 'h2s' | 'indole';
  result: '+' | '-' | string;
  size?: number;
  className?: string;
  label?: string;
}

export const BiochemicalReactionSvg: React.FC<BiochemicalReactionSvgProps> = ({
  testType,
  result,
  size = 140,
  className = '',
  label
}) => {
  const isPositive = result === '+' || result.toLowerCase().includes('pos');

  const renderContent = () => {
    switch (testType) {
      case 'catalase':
        return (
          <g>
            {/* Glass Microscope Slide */}
            <rect x="25" y="60" width="150" height="80" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
            <rect x="35" y="70" width="130" height="60" rx="3" fill="#ffffff" opacity="0.5" />
            {isPositive ? (
              <g>
                {/* 3% H2O2 droplet with vigorous effervescent bubbling */}
                <ellipse cx="100" cy="100" rx="35" ry="25" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />
                {/* O2 gas bubbles */}
                {[
                  {cx: 90, cy: 95, r: 6}, {cx: 110, cy: 92, r: 7}, {cx: 100, cy: 105, r: 8},
                  {cx: 85, cy: 110, r: 4}, {cx: 115, cy: 108, r: 5}, {cx: 95, cy: 85, r: 4},
                  {cx: 105, cy: 82, r: 4.5}
                ].map((b, i) => (
                  <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
                ))}
              </g>
            ) : (
              <g>
                {/* Quiet drop, no bubbles */}
                <ellipse cx="100" cy="100" rx="25" ry="18" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" opacity="0.6" />
              </g>
            )}
          </g>
        );

      case 'oxidase':
        return (
          <g>
            {/* Filter paper disk / swab */}
            <circle cx="100" cy="100" r="70" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="100" cy="100" r="65" fill="#ffffff" />
            {isPositive ? (
              <g>
                {/* Immediate deep dark purple / indophenol blue spot within 10-30s */}
                <circle cx="100" cy="100" r="38" fill="#4c1d95" opacity="0.95" />
                <circle cx="100" cy="100" r="28" fill="#2e1065" />
                <path d="M75,95 Q100,75 125,95 Q135,115 110,125 Q85,120 75,95 Z" fill="#581c87" opacity="0.8" />
              </g>
            ) : (
              <g>
                {/* Colorless / faint tan smear */}
                <circle cx="100" cy="100" r="30" fill="#fef3c7" opacity="0.5" />
              </g>
            )}
          </g>
        );

      case 'coagulase':
        return (
          <g>
            {/* Tilted test tube with rabbit plasma */}
            <g transform="translate(100, 100) rotate(-35)">
              <rect x="-18" y="-70" width="36" height="130" rx="18" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" opacity="0.8" />
              {isPositive ? (
                <g>
                  {/* Firm insoluble fibrin gel clot adhering to bottom even when tilted */}
                  <path d="M-17,10 Q0,0 17,10 L17,45 Q0,60 -17,45 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                  <path d="M-10,25 Q0,18 10,25" stroke="#92400e" strokeWidth="1" fill="none" />
                </g>
              ) : (
                <g>
                  {/* Liquid plasma flowing down the side when tilted */}
                  <path d="M-17,-10 Q5,-5 17,25 L17,45 Q0,60 -17,45 Z" fill="#fef08a" opacity="0.8" />
                </g>
              )}
            </g>
          </g>
        );

      case 'h2s':
        return (
          <g>
            {/* TSI / KIA agar slant tube */}
            <rect x="80" y="20" width="40" height="150" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" opacity="0.85" />
            {/* Slant top */}
            <path d="M81,75 L119,45 L119,155 Q100,168 81,155 Z" fill="#dc2626" />
            {isPositive ? (
              <g>
                {/* Butt jet-black FeS precipitation */}
                <path d="M81,100 L119,100 L119,155 Q100,168 81,155 Z" fill="#09090b" stroke="#18181b" strokeWidth="1" />
              </g>
            ) : (
              <g>
                {/* Yellow acid or red alkaline butt, no blackening */}
                <path d="M81,110 L119,110 L119,155 Q100,168 81,155 Z" fill="#facc15" />
              </g>
            )}
          </g>
        );

      case 'indole':
        return (
          <g>
            {/* SIM / Peptone broth tube */}
            <rect x="80" y="20" width="40" height="150" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" opacity="0.85" />
            {/* Broth base */}
            <path d="M81,60 L119,60 L119,155 Q100,168 81,155 Z" fill="#fed7aa" />
            {isPositive ? (
              <g>
                {/* Brilliant cherry-red Kovac's reagent ring on surface */}
                <rect x="81" y="60" width="38" height="15" rx="3" fill="#e11d48" stroke="#9f1239" strokeWidth="1.2" />
              </g>
            ) : (
              <g>
                {/* Yellow Kovac's reagent layer (negative) */}
                <rect x="81" y="60" width="38" height="15" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              </g>
            )}
          </g>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xs">
        {renderContent()}
      </svg>
      {label && (
        <span className="mt-1 text-xs font-semibold text-slate-700 text-center">
          {label}
        </span>
      )}
    </div>
  );
};
