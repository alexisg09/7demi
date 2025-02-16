import './App.css'
import { SeptetDemi } from './game/SeptDemi'

function App() {

  const test = SeptetDemi;
  console.log(test);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8 animate-bounce">7Demi</h1>
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create a Room</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Room Name:</label>
              <input type="text" name="roomName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input type="password" name="createPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Create Room</button>
          </form>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Join a Room</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Room Name:</label>
              <input type="text" name="joinRoomName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input type="password" name="joinPassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Join Room</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
