// components/AuthForm.js
const AuthForm = ({ isLogin, onSubmit }) => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" required />
          {!isLogin && <input type="text" placeholder="Username" className="w-full p-2 border rounded" />}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{isLogin ? 'Login' : 'Register'}</button>
        </form>
      </div>
    );
  };
  
  export default AuthForm;
  