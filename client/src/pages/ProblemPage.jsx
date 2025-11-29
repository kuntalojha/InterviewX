import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import OutputPanel from '../components/OutputPanel';
import CodeEditorPanel from '../components/CodeEditorPanel';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState('two-sum');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript
  );

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // Update problem when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) setCurrentProblemId(id);
    setCode(PROBLEMS[id].starterCode[selectedLanguage]);
    setOutput(null);
  }, [id, selectedLanguage]);

  const heandelLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {};

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split('\n')
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, '[')
          .replace(/\s+\]/g, ']')
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ',')
      )
      .filter((line) => line.length > 0)
      .join('\n');
  };

  const checkIfTestCasePasses = (actualOutput, expectedOutput) => {
    const normalizedActua = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActua === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    //  check is code executed successfully and matches expected output

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestCasePasses(result.output, expectedOutput);

      if (testsPassed) {
        toast.success = 'All test passed! Great job!';
      } else {
        toast.error = 'Test failed! Try again!';
      }
    }
  };

  return (
    <div className="min-h-screen  bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Left panel-problem description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-green-600  transition-colors cursor-col-resize" />

          {/* Right panel code editor and output panel */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={heandelLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-green-600  transition-colors cursor-col-resize" />

              {/* Bottom panel output */}
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
