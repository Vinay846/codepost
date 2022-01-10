import React, { useEffect } from "react";
import Prism from "prismjs";
// import "prismjs/themes/prism-coy.css";
// import 'prismjs/themes/prism-twilight.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-scss';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.min';



export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);
  return (
    <div className="Code">
      <pre className="line-numbers">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
