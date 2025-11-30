export const defineInterviewXTheme = (monaco) => {
  monaco.editor.defineTheme('interviewx-monokai', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'F8F8F2', background: '1E1E1E' },
      { token: 'keyword', foreground: '10b981', fontStyle: 'bold' },
      { token: 'string', foreground: 'e6db74' },
      { token: 'number', foreground: 'ae81ff' },
      { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
      { token: 'identifier', foreground: '66d9ef' },
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editorCursor.foreground': '#10b981',
      'editor.selectionBackground': '#10b98144',
      'editor.lineHighlightBackground': '#2d2d2d',
      'editorLineNumber.foreground': '#6b7280',
    },
  });
};

// export const defineInterviewXTheme = (monaco) => {
//   monaco.editor.defineTheme('interviewx-monokai', {
//     base: 'vs-dark',
//     inherit: true,
//     rules: [
//       { token: '', foreground: 'F8F8F2', background: '1E1E1E' },

//       // keywords
//       { token: 'keyword', foreground: '10b981', fontStyle: 'bold' },

//       // strings & numbers
//       { token: 'string', foreground: 'e6db74' },
//       { token: 'number', foreground: 'ae81ff' },

//       // comments
//       { token: 'comment', foreground: '75715e', fontStyle: 'italic' },

//       // identifiers (generic)
//       { token: 'identifier', foreground: '66d9ef' },

//       // NEW: custom function names
//       { token: 'function', foreground: '10b981', fontStyle: 'bold' },

//       // NEW: object members (like .log)
//       { token: 'member', foreground: '38bdf8' },

//       // NEW: global objects (console, Math, Array, etc.)
//       { token: 'type.identifier', foreground: 'f472b6' },
//     ],

//     colors: {
//       'editor.background': '#1E1E1E',
//       'editorCursor.foreground': '#10b981',
//       'editor.selectionBackground': '#10b98144',
//       'editor.lineHighlightBackground': '#2d2d2d',
//       'editorLineNumber.foreground': '#6b7280',
//     },
//   });
// };
