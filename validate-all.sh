#!/bin/bash

echo "=================================="
echo "🚀 NANO COMPUTING - CODE VALIDATION"
echo "=================================="
echo ""

echo "1️⃣  TypeScript Type Check..."
npm run type-check
TYPE_CHECK=$?

echo ""
echo "2️⃣  ESLint Check..."
npm run lint
LINT=$?

echo ""
echo "3️⃣  Prettier Format Check..."
npm run format:check
FORMAT=$?

echo ""
echo "4️⃣  Stylelint CSS Check..."
npm run style-lint
STYLE=$?

echo ""
echo "=================================="
echo "📊 VALIDATION SUMMARY"
echo "=================================="
echo "TypeScript: $([ $TYPE_CHECK -eq 0 ] && echo '✅ PASS' || echo '❌ FAIL')"
echo "ESLint:     $([ $LINT -eq 0 ] && echo '✅ PASS' || echo '❌ FAIL')"
echo "Prettier:   $([ $FORMAT -eq 0 ] && echo '✅ PASS' || echo '❌ FAIL')"
echo "Stylelint:  $([ $STYLE -eq 0 ] && echo '✅ PASS' || echo '❌ FAIL')"
echo "=================================="

exit $(( TYPE_CHECK + LINT + FORMAT + STYLE ))
