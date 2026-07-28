const fs = require('fs');

const files = [
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-sepsis.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibd.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-ibs.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // Restore broken tag closings like class="..."&gt; or id="..."&gt; or </span>&gt; or </div>&gt;
    content = content.replace(/"&gt;/g, '">');
    content = content.replace(/'&gt;/g, "'>");
    content = content.replace(/span&gt;/g, 'span>');
    content = content.replace(/div&gt;/g, 'div>');
    content = content.replace(/td&gt;/g, 'td>');
    content = content.replace(/th&gt;/g, 'th>');
    content = content.replace(/p&gt;/g, 'p>');
    content = content.replace(/li&gt;/g, 'li>');
    content = content.replace(/ol&gt;/g, 'ol>');
    content = content.replace(/ul&gt;/g, 'ul>');

    // Specifically escape mathematical / comparison less-than & greater-than signs in text
    // E.g., "FC < 50" -> "FC &lt; 50"
    // "FC > 150" -> "FC &gt; 150"
    // "CDAI < 150" -> "CDAI &lt; 150"
    // "CDAI > 450" -> "CDAI &gt; 450"
    // "< 25%" -> "&lt; 25%"
    // "> 25%" -> "&gt; 25%"
    // "< 70 kg" -> "&lt; 70 kg"
    // "≥ 70 kg" -> "≥ 70 kg"
    // "$< 30\%$"- > "$&lt; 30\\%$"

    // Fix < 25% or < 50 or < 150 or < 70 or < 30
    content = content.replace(/< 25%/g, '&lt; 25%');
    content = content.replace(/< 50/g, '&lt; 50');
    content = content.replace(/< 150/g, '&lt; 150');
    content = content.replace(/< 70/g, '&lt; 70');
    content = content.replace(/< 30/g, '&lt; 30');
    content = content.replace(/<30/g, '&lt;30');
    content = content.replace(/< 15/g, '&lt; 15');
    content = content.replace(/< 7.5/g, '&lt; 7.5');

    // Fix > 25% or > 150 or > 250 or > 450 or > 40 or > 2
    content = content.replace(/> 25%/g, '&gt; 25%');
    content = content.replace(/> 150/g, '&gt; 150');
    content = content.replace(/> 250/g, '&gt; 250');
    content = content.replace(/> 450/g, '&gt; 450');
    content = content.replace(/> 40/g, '&gt; 40');
    content = content.replace(/> 2/g, '&gt; 2');
    content = content.replace(/> 70/g, '&gt; 70');

    fs.writeFileSync(f, content, 'utf8');
    console.log('Processed:', f);
});
