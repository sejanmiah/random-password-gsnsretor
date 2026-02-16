import React, { useState, useEffect } from 'react'
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeUpperCase, setIncludeUpperCase] = useState(true)
  const [includeLowerCase, setIncludeLowerCase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  // Generate password on initial load and when dependencies change
  useEffect(() => {
    handleGeneratePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols])

  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      return
    }

    let characterList = ""
    if (includeNumbers) characterList += numbers
    if (includeUpperCase) characterList += upperCaseLetters
    if (includeLowerCase) characterList += lowerCaseLetters
    if (includeSymbols) characterList += specialCharacters

    setPassword(createPassword(characterList))
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
        theme: "colored",
        style: { backgroundColor: '#d9534f' }
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

  // Calculate strength for visual bar
  const calculateStrength = () => {
    let strength = 0;
    if (passwordLength > 8) strength += 1;
    if (passwordLength > 12) strength += 1;
    if (includeUpperCase) strength += 1;
    if (includeLowerCase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    return strength; // Max 6
  }

  const strength = calculateStrength();
  const strengthColor = strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-green-600';
  const strengthText = strength < 3 ? 'Weak' : strength < 5 ? 'Medium' : 'Strong';
  const strengthTextColor = strength < 3 ? 'text-red-500' : strength < 5 ? 'text-yellow-500' : 'text-green-600';

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white text-gray-800 font-sans">
      <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 tracking-tight">SejanPass</h1>
      </nav>

      <div className="w-full max-w-4xl px-4 mt-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Instantly generate a secure, random password with the LastPass online tool
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Use our online password generator tool to instantly create a secure, random password.
        </p>

        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-10 mb-12">
          <div className="relative flex items-center mb-6">
            <div className="w-full h-20 bg-white border border-gray-300 rounded-lg flex items-center px-6 text-4xl font-mono text-gray-800 shadow-sm">
              {password}
            </div>

            <button
              onClick={handleGeneratePassword}
              className="absolute right-52 p-2 text-gray-400 hover:text-gray-600 transition-colors transform hover:rotate-180 duration-500"
              title="Generate New"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={handleCopyPassword}
              className="absolute right-3 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold text-lg py-3 px-8 rounded-lg transition-colors shadow-sm flex items-center h-14"
            >
              Copy password
            </button>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full mb-2 overflow-hidden">
            <div className={`h-full ${strengthColor} transition-all duration-300`} style={{ width: '100%' }}></div>
          </div>
          <div className={`flex justify-end ${strengthTextColor} font-bold text-sm mb-10 items-center`}>
            {strength >= 5 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {strengthText}
          </div>

          <div className="bg-[#f7f9fa] rounded-lg p-8">
            <div className="flex items-center mb-10">
              <label className="text-gray-800 font-bold mr-6 w-48 text-left text-lg">Password Length</label>
              <div className="flex-1 flex items-center">
                <span className="font-bold text-xl mr-6 w-8">{passwordLength}</span>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-600"
                />
              </div>
            </div>

            <div className="flex items-start">
              <label className="text-gray-800 font-bold mr-6 w-48 text-left pt-0.5 text-lg">Characters Used</label>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                <Checkbox label="Uppercase" checked={includeUpperCase} onChange={() => setIncludeUpperCase(!includeUpperCase)} />
                <Checkbox label="Lowercase" checked={includeLowerCase} onChange={() => setIncludeLowerCase(!includeLowerCase)} />
                <Checkbox label="Numbers" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                <Checkbox label="Symbols" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center cursor-pointer group select-none">
    <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors mr-3 ${checked ? 'bg-[#323a45] border-[#323a45]' : 'bg-white border-gray-400 group-hover:border-gray-600'}`}>
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    <span className="text-gray-700 font-medium text-lg group-hover:text-gray-900">{label}</span>
  </label>
)

export default App
