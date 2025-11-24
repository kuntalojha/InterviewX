import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import OutputPanel from '../components/OutputPanel';
import CodeEditorPanel from '../components/CodeEditorPanel';

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

  const heandelLanguageChange = (event) => {};

  const handleProblemChange = (event) => {};

  const triggerConfetti = () => {};

  const checkIfTestCasePasses = () => {};

  const handleRunCode = () => {};

  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Left panel-problem description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-green-600  transition-colors cursor-col-resize" />
          {/* Right panel code editor and output panel */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel />
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
