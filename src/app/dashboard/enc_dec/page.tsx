"use client";
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter , usePathname } from 'next/navigation';

export default function EncryptDecryptPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isDecryptOpen, onOpen: onDecryptOpen, onOpenChange: onDecryptChange } = useDisclosure();
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [error, setError] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [inputSecretForDecryption, setInputSecretForDecryption] = useState('');
  const router = useRouter();
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();  
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "IP Scanner", path: "/dashboard/ip_scanner" },
    { name: "Vulnerability Scanner", path: "/dashboard/vulnerability_scanner"},
    { name: "Encrypt/Decrypt", path: "/dashboard/enc_dec" },
  ];

  // Ensure the secret key meets AES-GCM length requirements
  const getValidKey = (key: string) => {
    const keyBuffer = textEncoder.encode(key);
    const paddedKey = new Uint8Array(32); // 256-bit key (32 bytes)
    paddedKey.set(keyBuffer.slice(0, 32)); // Truncate or pad to 32 bytes
    return paddedKey;
  };

  const encryptMessage = async () => {
    setError('');
    try {
      const key = await crypto.subtle.importKey(
        'raw',
        getValidKey(secret),
        'AES-GCM',
        false,
        ['encrypt']
      );

      const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        textEncoder.encode(message)
      );

      const encryptedToken = JSON.stringify({
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedBuffer)),
      });

      setEncrypted(encryptedToken);
      onOpenChange(); // Close the modal after encryption
    } catch (err) {
      if (err instanceof Error) {
        setError('Encryption failed: ' + err.message);
      } else {
        setError('Encryption failed');
      }
    }
  };

  const decryptMessage = async () => {
    setError('');
    try {
      const { iv, data } = JSON.parse(inputToken);

      const key = await crypto.subtle.importKey(
        'raw',
        getValidKey(inputSecretForDecryption),
        'AES-GCM',
        false,
        ['decrypt']
      );

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        new Uint8Array(data)
      );

      setDecrypted(textDecoder.decode(decryptedBuffer));
      onDecryptChange(); // Close the modal after decryption
    } catch (err) {
      if (err instanceof Error) {
        setError('Decryption failed: Wrong Secret Key ' + err.message);
      } else {
        setError('Decryption failed: Wrong Secret Key');
      }
      onDecryptChange();
    }
  };

  const handleDecryptModalSubmit = () => {
    if (inputSecretForDecryption) {
      // Check if secret key is correct for decryption
      decryptMessage();
    } else {
      setError("Secret key is required for decryption.");
    }
  };

  // Copy encrypted token to clipboard
  const copyToClipboard = () => {
    if (encrypted) {
      navigator.clipboard.writeText(encrypted).then(() => {
        // alert('Token copied to clipboard!');
      }).catch(() => {
        // alert('Failed to copy token.');
      });
    }
  };

  // Clear the data when modal is closed
  const handleEncryptModalClose = () => {
    setSecret('');
    setError('');
    onOpenChange();
  };

  const handleDecryptModalClose = () => {
    setInputSecretForDecryption('');
    setError('');
    onDecryptChange();
  };

  

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-zinc-900 shadow-lg border-b border-zinc-700">
        <h1 className="text-6xl font-bold text-purple-400">CyberWise</h1>
        <button className="px-3 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition">
          Latest Updates
        </button>
      </nav>

      {/* Navigation Items */}
      <div className="bg-zinc-900 w-3/4 ml-44 rounded-bl-3xl rounded-br-3xl justify-center border border-zinc-700">
        <div className="flex justify-center space-x-16 text-lg font-semibold text-gray-300 px-6 py-3">
          {navItems.map((item, index) => (
            <span
              key={index}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer transition-colors px-4 py-2 rounded-lg ${
                pathname === item.path ? "text-purple-400 bg-zinc-800" : "hover:text-purple-400"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    <div className="min-h-screen bg-black text-gray-100 font-mono flex flex-col items-center justify-center p-6">


      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-8">
        Encrypt & Decrypt
      </h1>

      {/* Container for parallel layout */}
      <div className="flex flex-row justify-between w-full max-w-4xl gap-8">

        {/* Encrypt Section */}
        <div className="flex flex-col w-full max-w-lg">
          <textarea
            className="bg-gradient-to-b from-zinc-900 to-black text-gray-100 rounded-lg border border-gray-600 p-4 mb-4 resize-none focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Enter your message to encrypt"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            className="px-6 py-3 bg-gradient-to-b from-purple-600 to-blue-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-gradient-to-b hover:from-purple-700 hover:to-blue-700 mb-4"
            onClick={onOpen} // Open the modal to ask for secret key
          >
            Encrypt
          </button>

          <p className="mt-4 break-all text-gray-300 max-w-lg">
            <strong>Encrypted Token:</strong> {encrypted || "No token yet"}
          </p>

          {encrypted && (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
              onClick={copyToClipboard}
            >
              Copy Token
            </button>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Decrypt Section */}
        <div className="flex flex-col w-full max-w-lg">
          <textarea
            className="bg-gradient-to-b from-zinc-900 to-black text-gray-100 rounded-lg border border-gray-600 p-4 mb-4 resize-none focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Paste your encrypted message to decrypt"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
          ></textarea>

          <button
            className="px-6 py-3 bg-gradient-to-b from-purple-600 to-blue-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-gradient-to-b hover:from-purple-700 hover:to-blue-700 mb-4"
            onClick={onDecryptOpen} // Open the modal to ask for secret key
          >
            Decrypt
          </button>

          <p className="mt-4 break-all text-gray-300 max-w-lg">
            <strong>Decrypted Message:</strong> {decrypted || "No decrypted message yet"}
          </p>
        </div>

      </div>

      {/* Encrypt Modal */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={handleEncryptModalClose}
      >
        <ModalContent>
          <ModalHeader>Enter Secret Key to Encrypt</ModalHeader>
          <ModalBody>
            <input
              type="password"
              className="border border-gray-600 rounded-lg p-4 w-full mb-4 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter secret key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={encryptMessage}>
              Generate Token
            </Button>
            <Button color="danger" variant="light" onPress={handleEncryptModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Decrypt Modal */}
      <Modal
        backdrop="opaque"
        isOpen={isDecryptOpen}
        onOpenChange={handleDecryptModalClose}
      >
        <ModalContent>
          <ModalHeader>Enter Secret Key to Decrypt</ModalHeader>
          <ModalBody>
            <input
              type="password"
              className="border border-gray-600 rounded-lg p-4 w-full mb-4 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter secret key"
              value={inputSecretForDecryption}
              onChange={(e) => setInputSecretForDecryption(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleDecryptModalSubmit}>
              Submit
            </Button>
            <Button color="danger" variant="light" onPress={handleDecryptModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    </div>
  );
}
