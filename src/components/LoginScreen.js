import React from 'react';
import { User, ChefHat } from 'lucide-react';

export function LoginScreen({ users, onLogin }) {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-800 mb-4">
            <ChefHat className="w-10 h-10 text-stone-100" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">FoodSync</h1>
          <p className="text-stone-600">Wähle deinen Benutzer</p>
        </div>
        
        <div className="space-y-3">
          {users.map((user, idx) => (
            <button
              key={idx}
              onClick={() => onLogin(user)}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white p-4 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{user.username}</div>
                    <div className="text-sm opacity-80">{user.spezielleDiaet}</div>
                  </div>
                </div>
                <div className="text-sm font-medium">{user.kalorien} kcal</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}