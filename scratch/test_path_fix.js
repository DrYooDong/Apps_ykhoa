function getProjectRootPrefix(headerPath) {
  if (!headerPath) return '';
  const idx = headerPath.lastIndexOf('components/');
  if (idx !== -1) {
    return headerPath.substring(0, idx);
  }
  const depth = (headerPath.match(/\.\.\//g) || []).length;
  return '../'.repeat(depth);
}

function cleanAndBuildHref(href, projectRoot) {
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return href;
  const cleanHref = href.replace(/^(\.\.\/|\.\/|\/)+/, '');
  return projectRoot + cleanHref;
}

const testCases = [
  { headerPath: 'components/header.html', href: 'src/content/skills/ky-nang.html', expected: 'src/content/skills/ky-nang.html' },
  { headerPath: '../components/header.html', href: 'src/content/skills/ky-nang.html', expected: '../src/content/skills/ky-nang.html' },
  { headerPath: '../../components/header.html', href: 'src/content/skills/ky-nang.html', expected: '../../src/content/skills/ky-nang.html' },
  { headerPath: '../../../components/header.html', href: 'index.html', expected: '../../../index.html' },
  { headerPath: '../../../../components/header.html', href: '../index.html', expected: '../../../../index.html' },
  { headerPath: '../../../../../components/header.html', href: './src/content/ebm/yhcc.html', expected: '../../../../../src/content/ebm/yhcc.html' },
];

let failed = false;
testCases.forEach((tc, i) => {
  const root = getProjectRootPrefix(tc.headerPath);
  const result = cleanAndBuildHref(tc.href, root);
  if (result !== tc.expected) {
    console.error(`Test ${i} failed: expected "${tc.expected}", got "${result}"`);
    failed = true;
  } else {
    console.log(`Test ${i} passed: "${result}"`);
  }
});

if (!failed) {
  console.log("ALL PATH RESOLUTION TESTS PASSED SUCCESSFULLY!");
}
