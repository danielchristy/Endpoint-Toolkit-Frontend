import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import CertificationCards from '../../components/CertificationCards/CertificationCards';
import './UserProfile.css';

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const showQuestionnaire = () => {
    navigate('/questionnaire');
  };

  return (
    <div className='user-page'>
      test
      <div className='settings-btn'>
        put settings button here
      </div>

      <div className='user-info'>
        <img src={user.profile_picture} alt="Profile" className='profile-picture' />
        <div className='user-details-text'>
          <p><strong>{user.first_name} {user.last_name}</strong> </p>
          <p>other user details</p>
        </div>
      </div>

      <div className='dashboard'>
        <h2 className='dashboard-title'>Dashboard</h2>
        <div className='questionnaire-details'>
          <p>Questionnaire Details</p>
          <p>if user has no data from questionnaire - put link</p>
          <p>if user has data from questionnaire - display results</p>
        </div>

        <div className='dashboard-content'>
          <div className='certification-cards'>
            <CertificationCards />
          </div>
          
        </div>
      </div>
    </div>
  )
};

export default UserPage;


{/* // export default function UserPage() {
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError]       = useState('');
//   const { login, loading }      = useContext(AuthContext);
//   const navigate                = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     const result = await login(email, password);
//     if (result.success) {
//       navigate('/user/dashboard');
//     } else {
//       setError(result.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-teal-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border-t-4 border-bccaBlue">
//         <h2 className="text-3xl font-extrabold text-bccaBlue mb-6 text-center">
//           BCCA Sign In
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bccaBlue"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bccaBlue"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-bccaBlue hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
//           >
//             {loading ? 'Signing in…' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
 }*/}
