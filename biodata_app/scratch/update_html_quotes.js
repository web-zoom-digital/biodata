const fs = require('fs');
let code = fs.readFileSync('src/lib/generateBiodataHtml.ts', 'utf8');

// 1. In renderRoyalHeritage, use 'royal' theme
code = code.replace(
  "renderDecorativeBackgroundHtml('traditional', p.accent, p.gold, 0.14)",
  "renderDecorativeBackgroundHtml('royal', p.accent, p.gold, 0.14)"
);

// 2. Emerald Classic
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 2. Royal Heritage',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.lineSoft)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 2. Royal Heritage'
);

// 3. Royal Heritage
code = code.replace(
  '${renderTrademarkHtml(p.gold)}\n    </div>\n  `;\n}\n\n// 3. Minimal Ivory',
  '${renderQuoteBannerHtml(model.quote, p.gold, p.goldSoft)}\n      ${renderTrademarkHtml(p.gold)}\n    </div>\n  `;\n}\n\n// 3. Minimal Ivory'
);

// 4. Minimal Ivory
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 4. Modern Indigo',
  '${renderQuoteBannerHtml(model.quote, p.muted, p.border)}\n      ${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 4. Modern Indigo'
);

// 5. Modern Indigo
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n        </div>\n      </div>\n    </div>\n  `;\n}\n\n// 5. Elegant Rose',
  '${renderQuoteBannerHtml(model.quote, p.inkMuted, p.border)}\n          ${renderTrademarkHtml(p.accent)}\n        </div>\n      </div>\n    </div>\n  `;\n}\n\n// 5. Elegant Rose'
);

// 6. Elegant Rose
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 6. Traditional Gold',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.border)}\n      ${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 6. Traditional Gold'
);

// 7. Traditional Gold
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 7. Blue Floral',
  '${renderQuoteBannerHtml(model.quote, p.deep, p.lineSoft)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 7. Blue Floral'
);

// 8. Blue Floral
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 8. Peach Floral',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.border)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 8. Peach Floral'
);

// 9. Peach Floral
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 9. Red Rose Classic',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.border)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 9. Red Rose Classic'
);

// 10. Red Rose Classic
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 10. Islamic Emerald',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.border)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 10. Islamic Emerald'
);

// 11. Islamic Emerald
code = code.replace(
  '${renderTrademarkHtml(p.gold)}\n      </div>\n    </div>\n  `;\n}\n\n// 11. Islamic Ivory',
  '${renderQuoteBannerHtml(model.quote, p.gold, p.line)}\n        ${renderTrademarkHtml(p.gold)}\n      </div>\n    </div>\n  `;\n}\n\n// 11. Islamic Ivory'
);

// 12. Islamic Ivory
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 12. Jain Classic',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.lineSoft)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 12. Jain Classic'
);

// 13. Jain Classic
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 13. Classic Ganesha',
  '${renderQuoteBannerHtml(model.quote, p.purple, p.border)}\n        ${renderTrademarkHtml(p.accent)}\n      </div>\n    </div>\n  `;\n}\n\n// 13. Classic Ganesha'
);

// 14. Classic Ganesha
code = code.replace(
  '${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 14. Aurora Sage',
  '${renderQuoteBannerHtml(model.quote, p.accent, p.lineSoft)}\n      ${renderTrademarkHtml(p.accent)}\n    </div>\n  `;\n}\n\n// 14. Aurora Sage'
);

fs.writeFileSync('src/lib/generateBiodataHtml.ts', code);
console.log('Successfully updated src/lib/generateBiodataHtml.ts');
