import Image from 'next/image';
import Link from 'next/link';

export default function CromaticTechBioCaseStudy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-blue-600">TechBio, Outsourcing Tool (Dashboard)</h1>
            <div className="flex space-x-4">
              <span className="text-gray-600">Overview</span>
              <span className="text-gray-600">Features</span>
              <span className="text-gray-600">Pricing</span>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg">Get Started</button>
            </div>
          </div>
          
          {/* Hero Screenshot */}
          <div className="relative">
            <Image
              src="/images/cromatic-hero.png"
              alt="Cromatic TechBio Dashboard - Create New Project Modal"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-sm text-gray-600">
              UI-Generate
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            TechBio is an outsourcing tool designed to streamline the process of managing and tracking outsourced projects. 
            It provides a centralized platform for project managers, clients, and team members to collaborate, communicate, 
            and monitor project progress efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">📊</span>
                </div>
                <span className="text-lg font-semibold">Total Projects 12</span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Project Name</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Client</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Status</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Due Date</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Actions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Goal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Goal</h2>
          <p className="text-lg text-gray-700 mb-8">
            Design a user-friendly and intuitive dashboard that simplifies project management, enhances collaboration, 
            and provides real-time insights into project performance.
          </p>
          
          {/* User Flow Diagram */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Image
              src="/images/cromatic-user-flow.png"
              alt="User Flow Diagram"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Summary of Insights */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary of Insights</h2>
          <p className="text-lg text-gray-700 mb-8">
            Based on user research and competitive analysis, we identified key pain points and opportunities 
            for improvement in existing outsourcing tools.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Pain Points</h3>
          <p className="text-gray-700 mb-8">
            Users struggle with fragmented communication, lack of transparency, and inefficient task tracking.
          </p>
          
          <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/cromatic-projects-table.png"
              alt="Projects Table Interface"
              width={800}
              height={300}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* What We Found */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Found</h2>
          <p className="text-lg text-gray-700 mb-8">
            Users need a centralized platform that offers clear communication channels, real-time progress updates, 
            and robust reporting features.
          </p>
          
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">💬</span>
              </div>
              <span className="text-gray-700">Communication</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">📹</span>
              </div>
              <span className="text-gray-700">Video Calls</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">📄</span>
              </div>
              <span className="text-gray-700">Documents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Usability Testing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Insights on Testing</h2>
          <p className="text-lg text-gray-700 mb-8">
            We conducted usability tests with target users to validate our design concepts and gather feedback on the prototype.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Usability Test Results</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border rounded-lg p-6 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Task</th>
                    <th className="text-left py-2">Success Rate</th>
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Create Project</td>
                    <td className="py-2 text-green-600">90%</td>
                    <td className="py-2">2 min</td>
                    <td className="py-2 text-sm">Easy to use</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Assign Task</td>
                    <td className="py-2 text-green-600">85%</td>
                    <td className="py-2">3 min</td>
                    <td className="py-2 text-sm">Intuitive</td>
                  </tr>
                  <tr>
                    <td className="py-2">View Report</td>
                    <td className="py-2 text-green-600">95%</td>
                    <td className="py-2">1 min</td>
                    <td className="py-2 text-sm">Very helpful</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-6">
              <h4 className="font-semibold mb-4">User Feedback</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm">"The navigation is intuitive."</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-sm">"I found it difficult to find the task details."</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm">"The dashboard provides a good overview."</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm">"The reporting feature is very helpful."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key takeaways from usability tests</h2>
          <p className="text-lg text-gray-700 mb-8">
            Users appreciated the clean interface and intuitive navigation. However, some found the task management 
            features to be less robust than desired, and requested more customization options for reports.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recommendations</h3>
          <p className="text-gray-700 mb-8">
            Improve task management functionality, add more reporting customization options, and enhance notification settings.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <h4 className="font-semibold mb-2">Improve Task Management</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h4 className="font-semibold mb-2">More Reporting Options</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔔</span>
              </div>
              <h4 className="font-semibold mb-2">Enhanced Notifications</h4>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution</h2>
          <p className="text-lg text-gray-700 mb-8">
            Based on our findings, we developed a comprehensive solution that addresses the identified pain points 
            and meets user needs.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Key Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border rounded-lg p-4">
              <Image
                src="/images/cromatic-feature-1.png"
                alt="Project List with Status Indicators"
                width={300}
                height={200}
                className="w-full rounded"
              />
            </div>
            <div className="bg-white border rounded-lg p-4">
              <Image
                src="/images/cromatic-feature-2.png"
                alt="Task List with Due Dates"
                width={300}
                height={200}
                className="w-full rounded"
              />
            </div>
            <div className="bg-white border rounded-lg p-4">
              <Image
                src="/images/cromatic-feature-3.png"
                alt="Gantt Chart Timeline View"
                width={300}
                height={200}
                className="w-full rounded"
              />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">User Flow</h3>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">✓</span>
              </div>
              <span className="text-gray-700">Project Creation</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">✓</span>
              </div>
              <span className="text-gray-700">Task Assignment</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">✓</span>
              </div>
              <span className="text-gray-700">Progress Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Design explorations</h2>
          <p className="text-lg text-gray-700 mb-8">
            We explored various design concepts and iterations to arrive at the final user interface.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Wireframes</h3>
              <Image
                src="/images/cromatic-wireframes.png"
                alt="Wireframes"
                width={300}
                height={200}
                className="w-full rounded border"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mockups</h3>
              <Image
                src="/images/cromatic-mockups.png"
                alt="Mockups"
                width={300}
                height={200}
                className="w-full rounded border"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Prototypes</h3>
              <Image
                src="/images/cromatic-prototypes.png"
                alt="Prototypes"
                width={300}
                height={200}
                className="w-full rounded border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Flows */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User flows</h2>
          <p className="text-lg text-gray-700 mb-8">
            We mapped out key user flows to ensure a smooth and logical user experience.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Creation Flow</h3>
              <Image
                src="/images/cromatic-project-creation-flow.png"
                alt="Project Creation Flow"
                width={400}
                height={300}
                className="w-full rounded border"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Management Flow</h3>
              <Image
                src="/images/cromatic-task-management-flow.png"
                alt="Task Management Flow"
                width={400}
                height={300}
                className="w-full rounded border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Information Architecture */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Information architecture</h2>
          <p className="text-lg text-gray-700 mb-8">
            We structured the information logically to make it easy for users to find what they need.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Image
              src="/images/cromatic-information-architecture.png"
              alt="Information Architecture Diagram"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Key Features Detail */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key features</h2>
          <p className="text-lg text-gray-700 mb-8">
            The TechBio dashboard offers a range of powerful features to enhance project management.
          </p>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Dashboard</h3>
              <Image
                src="/images/cromatic-dashboard.png"
                alt="Project Dashboard"
                width={800}
                height={400}
                className="w-full rounded border shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Management</h3>
              <Image
                src="/images/cromatic-task-management.png"
                alt="Task Management Interface"
                width={800}
                height={400}
                className="w-full rounded border shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Reporting & Analytics</h3>
              <Image
                src="/images/cromatic-reporting.png"
                alt="Reporting Interface"
                width={800}
                height={400}
                className="w-full rounded border shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Communication & Collaboration</h3>
              <Image
                src="/images/cromatic-communication.png"
                alt="Communication Interface"
                width={800}
                height={400}
                className="w-full rounded border shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usability Feedback */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Usability feedback</h2>
          <p className="text-lg text-gray-700 mb-8">
            Post-launch, we gathered feedback from early adopters to identify areas for further improvement.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Positive Feedback</h3>
              <p className="text-gray-700">
                Users praised the intuitive interface, comprehensive features, and improved collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Areas for Improvement</h3>
              <p className="text-gray-700">
                Some users requested more advanced customization options for reports and integrations with other tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Final thoughts</h2>
          <p className="text-lg text-gray-700 mb-8">
            The TechBio dashboard successfully addresses the challenges of outsourcing project management, 
            providing a robust and user-friendly solution.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">One simple view</h3>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Image
              src="/images/cromatic-final-dashboard.png"
              alt="Final Dashboard View"
              width={800}
              height={500}
              className="w-full rounded"
            />
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
