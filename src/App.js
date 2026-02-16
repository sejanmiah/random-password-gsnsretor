import React, { useState } from 'react'
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("Select at least one option", true)
    } else {
      if (passwordLength < 5) {
        notify("Password length must be at least 5", true)
        return
      }

      let characterList = ""
      if (includeNumbers) characterList += numbers
      if (includeUpperCase) characterList += upperCaseLetters
      if (includeLowerCase) characterList += lowerCaseLetters
      if (includeSymbols) characterList += specialCharacters

      setPassword(createPassword(characterList))
      notify("Password generated successfully", false)
    }
  }

  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password)
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleCopyPassword = () => {
    if (password === "") {
      notify(COPY_Fail, true)
    } else {
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
          Password Gen
        </h2>

        <div className="bg-black/30 rounded-xl p-4 mb-6 flex justify-between items-center border border-white/10 relative overflow-hidden group">
          <h3 className="text-2xl text-white font-mono truncate mr-4 min-h-[2rem]">
            {password || <span className="text-white/30 text-lg">Click generate...</span>}
          </h3>
          <button
            onClick={handleCopyPassword}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg active:scale-95"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-white/90 text-sm font-medium">
              <label htmlFor="password-strength">Password Length</label>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{passwordLength}</span>
            </div>
            <input
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="range"
              id="password-strength"
              name="password-strength"
              max="26"
              min="5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Checkbox
              label="Uppercase"
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
            />
            <Checkbox
              label="Lowercase"
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
            />
            <Checkbox
              label="Numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <Checkbox
              label="Symbols"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </div>

          <button
            onClick={handleGeneratePassword}
            className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/30 text-lg tracking-wide uppercase"
          >
            Generate Password
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  )
}

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors border border-white/5 cursor-pointer" onClick={() => onChange({ target: { checked: !checked } })}>
    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-pink-500 border-pink-500' : 'border-white/40'}`}>
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <input
      checked={checked}
      onChange={onChange}
      type="checkbox"
      className="hidden"
    />
    <label className="text-white/90 text-sm font-medium cursor-pointer select-none">{label}</label>
  </div>
)

export default App
