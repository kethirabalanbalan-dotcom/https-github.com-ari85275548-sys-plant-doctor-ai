import React, { useState, useEffect } from 'react';
import { Database, Table, Key, Shield, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { getDatabaseSchema } from '../services/api';

export const DatabaseView: React.FC = () => {
  const [schemaData, setSchemaData] = useState<any>(null);
  const [activeTable, setActiveTable] = useState<'users' | 'plant_analysis' | 'diseases' | 'plant_care'>('users');

  useEffect(() => {
    getDatabaseSchema().then((data) => setSchemaData(data));
  }, []);

  const ddlStatements = {
    users: `CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  user_id VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  preferred_language ENUM('en', 'ta', 'tanglish') DEFAULT 'en',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
    plant_analysis: `CREATE TABLE plant_analysis (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  image_path TEXT NOT NULL,
  plant_name VARCHAR(255) NOT NULL,
  disease_name VARCHAR(255) NOT NULL,
  confidence DECIMAL(5, 2) NOT NULL,
  severity ENUM('Low', 'Medium', 'High', 'None') DEFAULT 'Medium',
  analysis_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`,
    diseases: `CREATE TABLE diseases (
  id VARCHAR(64) PRIMARY KEY,
  plant_name VARCHAR(255) NOT NULL,
  disease_name VARCHAR(255) NOT NULL,
  symptoms JSON NOT NULL,
  causes JSON NOT NULL,
  treatment TEXT NOT NULL,
  prevention TEXT NOT NULL
);`,
    plant_care: `CREATE TABLE plant_care (
  id VARCHAR(64) PRIMARY KEY,
  plant_name VARCHAR(255) NOT NULL,
  watering TEXT NOT NULL,
  fertilizer TEXT NOT NULL,
  sunlight TEXT NOT NULL
);`
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Backend Relational Architecture</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
          Database Schema: <code className="text-emerald-600 dark:text-emerald-400 font-mono">plant_doctor</code>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Relational entity model supporting user auth, computer vision analysis logs, pathogen knowledge bases, and localized horticultural care.
        </p>
      </div>

      {/* Database Schema Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Table Selector */}
        <div className="space-y-2">
          {(['users', 'plant_analysis', 'diseases', 'plant_care'] as const).map((table) => {
            const count = schemaData?.tables?.[table]?.rowCount ?? '•';
            return (
              <button
                key={table}
                onClick={() => setActiveTable(table)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  activeTable === table
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Table className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-xs font-bold">{table}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTable === table
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-500'
                }`}>
                  {count} rows
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Table Details & Columns */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-700">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Active Table Definition
                </span>
                <h2 className="text-lg font-black font-mono text-stone-900 dark:text-stone-100">
                  table `{activeTable}`
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live Synced</span>
              </span>
            </div>

            {/* Columns List */}
            <div>
              <h3 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                Field Attributes & Constraints
              </h3>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 dark:bg-stone-900 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-700">
                    <tr>
                      <th className="py-2.5 px-4">Column Name</th>
                      <th className="py-2.5 px-4">SQL Type & Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-700 font-mono">
                    {schemaData?.tables?.[activeTable]?.columns?.map((col: string, idx: number) => {
                      const [name, ...typeParts] = col.split(' ');
                      return (
                        <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                          <td className="py-2.5 px-4 font-bold text-stone-800 dark:text-stone-200 flex items-center space-x-1.5">
                            {typeParts.join(' ').includes('PK') && (
                              <Key className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            <span>{name}</span>
                          </td>
                          <td className="py-2.5 px-4 text-emerald-700 dark:text-emerald-400">
                            {typeParts.join(' ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DDL SQL Code Block */}
            <div>
              <h3 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <FileCode className="w-4 h-4 text-stone-400" />
                <span>MySQL Schema Definition (DDL)</span>
              </h3>
              <pre className="p-4 rounded-2xl bg-stone-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-stone-800 leading-relaxed">
                {ddlStatements[activeTable]}
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
