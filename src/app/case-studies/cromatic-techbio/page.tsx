/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

function getWebAppImages(): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'portfolio', 'projects', 'cromatic-webapp');
    if (!fs.existsSync(dir)) return [];
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|gif|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    return files.map((f) => `/images/portfolio/projects/cromatic-webapp/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export default function CromaticTechBioCaseStudy() {
  const images = getWebAppImages();
  return (
    <div className="min-h-screen bg-white px-[34px] py-[40px] rounded-[24px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16 rounded-[16px]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-600">TechBio, Outsourcing Tool (Dashboard)</h1>
          </div>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Timeline</h3>
              <p className="text-gray-600">Sept - Feb 2022</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform</h3>
              <p className="text-gray-600">Web Application</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">My Role</h3>
              <p className="text-gray-600">Lead Product Designer<br />UX Researcher</p>
            </div>
          </div>
          
          <a
            href="http://cromatic.bio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Go to platform
          </a>
        </div>
      </div>

      {/* Role and Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cromatic: Outsourcing Management Tool Web Application</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Role and Overview</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            As the sole and lead product designer on the team, within 6 months we shipped a platform that allows Biotechs to find the right vendors, and manage them. 
            Cromatic is a Techbio company based in San Francisco aimed at helping Biotechs outsource so they can focus on the science.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="py-16 bg-gray-50 rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Background</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            During Covid-19, Biotechs like Pfizer depended on vendors to increase vaccine production as they raced against time. 
            <a href="#" className="text-blue-600 hover:underline"> Read more here</a>
          </p>
        </div>
      </section>

      {/* The Goal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Goal</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The goal is to design a dashboard for Biotechs to contract the right vendors, and track its progress.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-blue-50 rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Process Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Conducted user research with 40+ Biotechs and vendors, synthesized insights, identified opportunities, rapidly tested solutions for user value and needs, ideated and implemented solutions.
          </p>
        </div>
      </section>

      {/* Image sequence */}
      {images.length > 0 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {images.map((src, i) => (
              <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Cromatic web app ${i + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary of Insights */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary of insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Biotechs</h3>
              <p className="text-gray-700">
                When sourcing to research orgs, Biotechs had a difficult time keeping track of vendors. Most of them were using emails to track progress.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Vendors (Research Organizations)</h3>
              <p className="text-gray-700">
                When looking for Biotech clients, they cold email and communicate from there.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Biotech's inbox: corresponding to different vendors for several requests among a sea of other emails</h4>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 bg-gray-50 rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Opportunity</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Some Biotechs and vendors use Slack for internal tracking, but they still relied on email for external communication and tracking across different organizations.
          </p>
          <button className="text-blue-600 hover:underline">View more context</button>
        </div>
      </section>

      {/* Assumption Testing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Assumption Testing</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The goal here is to test if a PM tool + External communications is going to help Biotechs find a vendor and track progress well.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Instead of jumping straight into building, we looked at existing PM tools we could use for usability tests and get feedback.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Actual data is omitted for privacy purposes</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Actual data is omitted for privacy purposes</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Onboarded over 20 Biotechs, matching them with at least 4 research orgs
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key takeaways from usability test:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
            <li>Biotechs loved the quality of the vendors and how fast they were matched by our scientist, but they still dropped off the platform.</li>
            <li>Directly scheduling video calls on the platform was crucial to reduce drop-off rates. While Biotechs and vendors communicated more efficiently through the chat, they reverted to email to schedule calls since Basecamp does not support this.</li>
            <li>A white-labelled PM tool just didn't make the cut, Biotechs went back to email.</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Why did the white-labelled PM tool not make the cut?</h3>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">What is it about email that creates this perception of easier coordination?</h3>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Making assumptions from design-perspective and intuition:
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The platform had to be simpler and more seamless than their email inbox to in order to help make the Biotech's process more efficient.
          </p>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 bg-blue-50 rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The challenge is to design a dashboard for Biotechs to quickly find the right vendors to contract, communicate and track requests.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard to keep track of request and projects</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">Drawing inspiration from PM tools</p>
          
          <div className="flex space-x-4 mb-8">
            <span className="bg-gray-200 px-4 py-2 rounded">Kanban</span>
            <span className="bg-gray-200 px-4 py-2 rounded">List</span>
            <span className="bg-gray-200 px-4 py-2 rounded">Gantt</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick recap</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The user flow would be: Biotechs share their request with us → choose a vendor → sign final contract
          </p>
        </div>
      </section>

      {/* Design Explorations */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Design explorations</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The challenge is to propose a dashboard that is:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
            <li><strong>Simple & intuitive</strong> - Biotechs can pick up the software immediately</li>
            <li><strong>Seamless</strong> - Biotechs can move onto each stage easily</li>
            <li><strong>Familiar</strong> - Design should match Biotechs mental modal of this workflow</li>
          </ul>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 1: Two separate tabs for requests and ongoing projects</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">Two separate tabs</p>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Two separate tabs prototype</p>
          </div>
          
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Design Proposal 1.1: Two separate tabs - Projects are displayed in a list layout on the request page.</h4>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Design Proposal 1.2: In the projects tab, projects are displayed in kanban layout</h4>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Switching tabs and context does not feel seamless, it can be annoying. 
            What if users had a centralized view in one page? What would that look like?
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 2: Having request list and ongoing projects in one tab.</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            How would users know when a request changes to a project? The project will go to the bottom section of the screen. This is not simple or intuitive.
            The request section at the top also takes up a lot of vertical real estate, this leaves the the projects section stashed beneath the viewport.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 3: Turning the requests list into a vertical row in the Project's kanban board, combining both requests and projects into one view.</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Kanban board layout, navigational menu drawer showing</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Kanban board layout, navigational menu drawer hidden</p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Biotech usability test feedback</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Biotechs were daunted by the UI and wanted something they could immediately understand. They felt like their system was still simpler.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Defining familiar patterns to ease users into the adoption of a new system</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            People in bio industry are used to the same system for years and it has been working for them, so they would generally be resistant to change. I worked on iterations, different version were tested to evaluate design options that were intentional, clear and easy-to-use.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Drawing inspiration from email inbox UI</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Email inbox screenshot placeholder</p>
          </div>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
            <li><strong>Visual balance:</strong> Each email is equal in size, but unread emails are differentiated with color. Overall there is cohesiveness in the UI while serving its function.</li>
            <li><strong>Chronological:</strong> Sorted by newest at the top</li>
          </ul>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 4: List layout, requests with the newest update goes to the top</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            This looks simple enough, but one Biotech request may involve choosing from multiple vendors.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            It has to be Functional. 
            Just like their email inbox, Biotechs need to have one high-level view of the requests, vendors, status, in a chronological order.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">One simple view</h3>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 5: Request title on the left, and list of vendors on the right</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Design Proposal 6: Request title at the top, and list of vendors at the bottom</h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 italic">Screenshot placeholder</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Now it's functional, it still feels like you just logged into a complex tool when it should be a simple flow.
          </p>
        </div>
      </section>

      {/* Final Design */}
      <section className="py-16 bg-green-50 rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Design</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Intuitive, Seamless, Familiar</h3>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Worked with developers to implement ways to reduce user's cognitive load by surfacing vendors who have uploaded a final contract at the top, by tracking when a file has been uploaded.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Through close collaboration with devs we decided to remove vendor avatar and logos as that increased implementation time while providing little user value.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Within ~6 months, we shipped the end-to-end product, where Biotechs took less time to contract the right vendor and sign the proposal, than they conventionally did.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-900 text-white rounded-[16px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Results</h2>
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li>As the Lead and sole Product Designer, we shipped the product from 0-1 in ~6 months.</li>
            <li>Previously, it would take weeks and even months for Biotechs to sign the final contract with a vendor. On our platform, final contracts were signed in a matter of days.</li>
            <li>Drop-off rate decreased substantially.</li>
            <li>Biotechs picked up the web app easily without hand-holding.</li>
            <li>The simplicity in the UI made communication with vendors seamless.</li>
            <li>Major contracts were signed on the platform with each deal averaging ~500K.</li>
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-4">
            "I had the pleasure of collaborating with Evangeline on a project where she served as the lead product designer, and I was the CTO.
            <br /><br />
            Evangeline has an exceptional ability to translate ideas into intuitive designs. Throughout the project, Evangeline was proactive in conducting user research and synthesizing the findings.
            <br /><br />
            What stood out to me the most about working with Evangeline was her collaborative spirit. She consistently sought out feedback and ideas from the development team, and her willingness to incorporate feedback into her designs made our collaboration seamless."
          </blockquote>
          <p className="text-gray-600 font-semibold">- Former CTO, Cromatic</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 rounded-[16px]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Copyright © 2023 Evangeline, Inc. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:underline">Twitter</a>
            <span className="text-gray-400">@eggsvans</span>
          </div>
          <p className="text-gray-500 text-sm mt-4">Made in Typedream</p>
        </div>
      </footer>

      {/* Back to Portfolio */}
      <section className="py-16 bg-gray-100 rounded-[16px]">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}