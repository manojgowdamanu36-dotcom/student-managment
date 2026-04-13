import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { StudentForm } from './components/StudentForm';
import { LayoutDashboard, Users, LogOut, UserPlus } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: string;
}

type View = 'dashboard' | 'students';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '1234567890',
      course: 'Computer Science',
      enrollmentDate: '2026-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '9876543210',
      course: 'Information Technology',
      enrollmentDate: '2026-02-20'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '5551234567',
      course: 'Computer Science',
      enrollmentDate: '2026-03-10'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '5559876543',
      course: 'Data Science',
      enrollmentDate: '2026-03-25'
    }
  ]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleSaveStudent = (studentData: Omit<Student, 'id'> & { id?: string }) => {
    if (studentData.id) {
      setStudents(prev => prev.map(s =>
        s.id === studentData.id ? { ...studentData as Student } : s
      ));
    } else {
      const newStudent: Student = {
        ...studentData,
        id: `${Date.now()}`
      };
      setStudents(prev => [...prev, newStudent]);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="size-full flex flex-col">
      <header className="h-16 bg-primary text-primary-foreground border-b border-primary-foreground/10 px-6 flex items-center justify-between">
        <h1>Student Management System</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded transition-colors flex items-center gap-2"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-card border-r border-border">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full px-4 py-3 rounded flex items-center gap-3 transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <LayoutDashboard className="size-5" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('students')}
              className={`w-full px-4 py-3 rounded flex items-center gap-3 transition-colors ${
                currentView === 'students'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <Users className="size-5" />
              Manage Students
            </button>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          {currentView === 'dashboard' ? (
            <Dashboard students={students} />
          ) : (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2>Manage Students</h2>
                  <p className="text-muted-foreground mt-1">Add, edit, or remove student records</p>
                </div>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="size-5" />
                  Add Student
                </button>
              </div>
              <StudentList
                students={students}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
              />
            </div>
          )}
        </main>
      </div>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onSave={handleSaveStudent}
          onClose={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}