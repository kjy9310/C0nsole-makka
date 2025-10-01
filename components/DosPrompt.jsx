import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 빛 from '../commands/빛';
import list from '../commands/list';
import open from '../commands/open';

const asciiArtC0nsole = [
    '  #####    #######  ##    ##  ######   #######  ##       #######    ',
    ' ##    ## ##    ### ###   ## ##    ## ##     ## ##       ##         ',
    ' ##       ##  ## ## ####  ## ##       ##     ## ##       ##         ',
    ' ##       ##  ## ## ## ## ##  ######  ##     ## ##       ######     ',
    ' ##       ## ##  ## ##  ####       ## ##     ## ##       ##         ',
    ' ##    ## ###    ## ##   ### ##    ## ##     ## ##       ##         ',
    '  #####    #######  ##    ##  ######   #######  ######## #######    ',
    '                                                                    ',
];

const asciiArtMakka = [
    ' ##    ##     ###    ##    ##  ##    ##     ###    ',
    ' ###   ###   ## ##   ##   ###  ##   ###    ## ##   ',
    ' #### ####  ##   ##  ##  ###   ##  ###    ##   ##  ',
    ' ## ### ## ######### ## ###    ## ###    ######### ',
    ' ##     ## ##     ## ##  ###   ##   ###  ##     ## ',
    ' ##     ## ##     ## ##   ###  ##    ### ##     ## ',
    ' ##     ## ##     ## ##    ### ##     ## ##     ## ',
    '                                                   ',
];

const helpText = [
  { type: 'output', text: '--- 도움말 ---' },
  { type: 'output', text: 'help: 이 도움말을 표시합니다.' },
  { type: 'output', text: 'list: 블로그 포스트 목록을 보여줍니다.' },
  { type: 'output', text: 'open [post_name]: 특정 포스트를 엽니다.' },
  { type: 'output', text: 'clear: 터미널 화면을 지웁니다.' },
  { type: 'output', text: '빛: let there be light를 외칩니다.' },
];

const welcomeMessage = [
    ...asciiArtC0nsole.map(line => ({ type: 'output', text: line })),
    ...asciiArtMakka.map(line => ({ type: 'output', text: line })),
    { type: 'output', text: '' },
    { type: 'output', text: 'C0nsole 블로그에 오신 것을 환영합니다.' },
    { type: 'output', text: "명령어를 입력하여 블로그를 탐색할 수 있습니다. 'help'를 입력하여 명령어 목록을 확인하세요." },
    { type: 'output', text: '' },
    ...helpText
];

const ConsoleWindow = styled.div`
  background-color: ${(props) => (props.$isFlashing ? '#FFFFFF' : '#000')};
  color: ${(props) => (props.$isFlashing ? '#000' : '#00FF41')};
  font-family: 'VT323', monospace;
  height: ${(props) => (props.$mini ? '100%' : 'calc(100vh - 8rem)')};
  font-size: ${(props) => (props.$mini ? '1.2rem' : '1.5rem')};
  padding: 1rem;
  margin: ${(props) => (props.$mini ? '0' : '4rem auto')};
  overflow: hidden;
  border: ${(props) => (props.$mini ? 'none' : '2px solid #00FF41')};
  border-top: ${(props) => (props.$mini ? '2px solid #00FF41' : '2px solid #00FF41')};
  box-shadow: ${(props) => (props.$mini ? '0 0 15px rgba(0, 255, 65, 0.5)' : '0 0 25px rgba(0, 255, 65, 0.5)')};
  text-shadow: 0 0 8px rgba(0, 255, 65, 0.7);
  display: flex;
  flex-direction: column;
  max-width: ${(props) => (props.$mini ? '100%' : '800px')};
  position: relative; // For positioning the button
  transition: background-color 0.1s ease-in, color 0.1s ease-in;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 2rem; // Increased margin to avoid scrollbar
    background: transparent;
    border: 1px solid #00FF41;
    color: #00FF41;
    font-family: inherit;
    font-size: 1.2rem; // Increased size
    cursor: pointer;
    padding: 0.1rem 0.6rem; // Increased size
    &:hover {
        background: #00FF41;
        color: #000;
    }
`;

const ConsoleOutput = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 1.5rem; // Make space for the button
`;

const Line = styled.div`
  display: flex;
  white-space: pre-wrap; // Allow wrapping
  word-break: break-all; // Break long words
`;

const PromptSymbol = styled.span`
    margin-right: 0.5rem;
`;

const PromptInput = styled.input`
  background: transparent;
  border: none;
  color: inherit; // Inherit color for flash effect
  font-family: inherit;
  font-size: inherit;
  outline: none;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export default function DosPrompt({ mini = false, onToggleVisibility, isTerminalVisible }) {
  const [cmd, setCmd] = useState('');
  const [log, setLog] = useState(mini ? [{type: 'output', text: "명령어를 입력하여 블로그를 탐색할 수 있습니다. 'help'를 입력하여 명령어 목록을 확인하세요."}] : welcomeMessage);
  const [background, setBackground] = useState('#000000');
  const [isFlashing, setIsFlashing] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  const triggerFlash = () => {
      setIsFlashing(true);
      setTimeout(() => {
          setIsFlashing(false);
      }, 150); // A quick flash
  }

  const commandMap = {
    help: () => helpText,
    빛: () => 빛(triggerFlash),
    list: async () => list(),
    open: async (arg) => open(arg),
    clear: () => { 
        setLog([]);
        return [];
    },
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      const trimmed = cmd.trim();
      const [commandName, ...args] = trimmed.split(/\s+/);
      const handler = commandMap[commandName];
      let newLog = [{ type: 'input', text: trimmed }];

      if (handler) {
        const result = await handler(...args);
        if (Array.isArray(result)) {
          newLog.push(...result);
        } else if (result) {
          newLog.push(result);
        }
      } else if (trimmed !== '') {
        newLog.push({ type: 'output', text: `'${commandName}'은(는) 존재하지 않는 명령어입니다.` });
      }

      setLog((prev) => [...prev, ...newLog]);
      setCmd('');
    }
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleConsoleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <ConsoleWindow $mini={mini} $isFlashing={isFlashing} style={{ backgroundColor: background }} onClick={handleConsoleClick}>
        {onToggleVisibility && (
            <ToggleButton onClick={onToggleVisibility}>
                {isTerminalVisible ? 'V' : '^'}
            </ToggleButton>
        )}
        <ConsoleOutput ref={logRef}>
          {log.map((entry, idx) => (
            entry.type === 'input' ? (
              <Line key={idx}>
                <PromptSymbol>C:\blog&gt;</PromptSymbol>
                <span>{entry.text}</span>
              </Line>
            ) : (
              <Line key={idx}>
                <span>{entry.text}</span>
              </Line>
            )
          ))}
          <Line>
            <PromptSymbol>C:\blog&gt;</PromptSymbol>
            <PromptInput
              ref={inputRef}
              autoFocus={!mini}
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={handleEnter}
            />
          </Line>
        </ConsoleOutput>
      </ConsoleWindow>
    </>
  );
}

