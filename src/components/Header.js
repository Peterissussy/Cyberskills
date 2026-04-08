import React from 'react';
import { ChefHat, LogOut } from 'lucide-react';

export function Header({ currentUser, onLogout }) {
  return (
    <div className="bg-emerald-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-8 h-8" />
            <h1 className="text-2xl font-bold">FoodSync</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-semibold">{currentUser.username}</div>
              <div className="text-sm text-emerald-200">{currentUser.kalorien} kcal/Tag</div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-emerald-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}