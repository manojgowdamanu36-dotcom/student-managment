import { Users, UserPlus, GraduationCap, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: string;
}

interface DashboardProps {
  students: Student[];
}

export function Dashboard({ students }: DashboardProps) {
  const totalStudents = students.length;
  const recentStudents = students.filter(s => {
    const enrollDate = new Date(s.enrollmentDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return enrollDate > thirtyDaysAgo;
  }).length;

  const courseDistribution = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCourses = Object.entries(courseDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const recentEnrollments = students
    .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Student management statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Students</p>
              <h1 className="mt-2">{totalStudents}</h1>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="size-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">New This Month</p>
              <h1 className="mt-2">{recentStudents}</h1>
            </div>
            <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center">
              <UserPlus className="size-6 text-chart-2" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Active Courses</p>
              <h1 className="mt-2">{Object.keys(courseDistribution).length}</h1>
            </div>
            <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center">
              <GraduationCap className="size-6 text-chart-3" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Growth Rate</p>
              <h1 className="mt-2">
                {totalStudents > 0 ? Math.round((recentStudents / totalStudents) * 100) : 0}%
              </h1>
            </div>
            <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
              <TrendingUp className="size-6 text-chart-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Top Courses</h3>
          <div className="space-y-4">
            {topCourses.length > 0 ? (
              topCourses.map(([course, count]) => (
                <div key={course}>
                  <div className="flex items-center justify-between mb-2">
                    <span>{course}</span>
                    <span className="text-muted-foreground">{count} students</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(count / totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No course data available</p>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-4">Recent Enrollments</h3>
          <div className="space-y-3">
            {recentEnrollments.length > 0 ? (
              recentEnrollments.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded"
                >
                  <div>
                    <p>{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No recent enrollments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
