import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoPlay } from 'react-icons/io5';
import { defineInterviewXTheme } from '../lib/interviewxTheme';
import Editor from '@monaco-editor/react';
import { LANGUAGE_CONFIG } from '../data/problems';
function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3 ">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select
            className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn bg-[#057357] btn-sm gap-2"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <AiOutlineLoading3Quarters className="size-4 animate-spin text-green-100" />
              <span className="text-green-100">Running...</span>
            </>
          ) : (
            <>
              <IoPlay className="size-4 " />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="interviewx-monokai"
          onMount={(editor, monaco) => {
            defineInterviewXTheme(monaco);
            monaco.editor.setTheme('interviewx-monokai');
          }}
          options={{
            fontSize: 16,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;
