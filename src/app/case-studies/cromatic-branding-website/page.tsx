/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

function getBrandingImages(): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'portfolio', 'projects', 'cromatic-website');
    if (!fs.existsSync(dir)) return [];
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|gif|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    return files.map((f) => `/images/portfolio/projects/cromatic-website/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export default function CromaticBrandingWebsite() {
  const images = getBrandingImages();
  return (
    <div className="min-h-screen bg-white px-[34px] py-[40px] rounded-[24px]">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16 rounded-[16px]">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">Cromatic Branding and Website</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Timeline</h3>
              <p className="mt-2 text-gray-800">September 2022</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Platform</h3>
              <p className="mt-2 text-gray-800">Responsive Website</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">My Role</h3>
              <p className="mt-2 text-gray-800">Product Designer<br/>Brand and Visual Designer<br/>UX Content Strategist</p>
            </div>
          </div>

          <p className="mt-10 text-gray-700 leading-relaxed">
            Cromatic is a Techbio company based in San Francisco focused on helping Biotechs outsource their experiments efficiently so they can focus on the science. For their first product, they are creating a way for Biotechs to find and evaluate the right research organization to outsource to. This project is focused on designing a website that represents the brand and service provided.
          </p>

          <div className="mt-6">
            <a href="https://www.cro-matic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.cro-matic.com</a>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Landing Impact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Landing Page Impact</h2>
          <p className="text-gray-700 mb-4">Yipee, we launched the landing page in September, 2022! For confidentiality reasons I have omitted the actual values for these metrics.</p>
          
          {/* Landing page metrics image */}
          {images.length > 0 && (
            <div className="mt-6">
              <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[0]} alt="Landing page metrics" className="w-full h-auto" />
              </div>
            </div>
          )}
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing page</h2>
          <p className="text-gray-700 mb-4">18% of the audience visited the pricing page from the landing page. Conversions improved slightly due to differentiated offerings and CTAs.</p>
          <p className="text-gray-500 mb-4">Pricing page, desktop and mobile</p>
          
          {/* Pricing page image */}
          {images.length > 1 && (
            <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[1]} alt="Pricing page design" className="w-full h-auto" />
            </div>
          )}
        </section>

        {/* Blog */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog</h2>
          <p className="text-gray-700 mb-4">Overall, user sessions increased by 20%, while individual posts were getting more views than before. The increase in interaction is partly due to marketing efforts as well.</p>
          <p className="text-gray-500 mb-4">Blog, desktop and mobile</p>
          <p className="text-gray-500 mb-4">Blog page, desktop and mobile</p>
          
          {/* Blog images */}
          {images.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[2]} alt="Blog desktop" className="w-full h-auto" />
              </div>
              {images.length > 3 && (
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[3]} alt="Blog mobile" className="w-full h-auto" />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Design Exploration */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Exploration</h2>
          <p className="text-gray-700 mb-6">I experimented with two branding styles to investigate which design captures the most significant percentage of our target audience, including scientists, BD from Biotechs, and research organizations.</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">Competitor Color Analysis</h3>
          <p className="text-gray-700 mb-4">Selecting colors and styling that stand out from the competition.</p>
          
          {/* Competitor analysis image */}
          {images.length > 4 && (
            <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[4]} alt="Competitor color analysis" className="w-full h-auto" />
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mb-2">High level brand inspiration</h3>
          <p className="text-gray-700 mb-4">Exploring color schemes that exudes professionalism, reliability, safety and security as an innovative tech startup.</p>
          
          {/* Brand inspiration image */}
          {images.length > 5 && (
            <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[5]} alt="Brand inspiration" className="w-full h-auto" />
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Direction A</h3>
          <p className="text-gray-700 mb-4">Sci-Fi, Futuristic, High-Tech</p>
          
          {/* Design Direction A images */}
          {images.length > 6 && (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[6]} alt="Design Direction A" className="w-full h-auto" />
              </div>
              {images.length > 7 && (
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[7]} alt="Design Direction A variant" className="w-full h-auto" />
                </div>
              )}
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Direction B</h3>
          <p className="text-gray-700 mb-4">Clinical, Clean, Airy, Professional, Trustworthy.</p>
          <p className="text-gray-700 mb-4">Experimenting with monochromatic and adjacent colors</p>
          <p className="text-gray-700 mb-4">Two proposed branding direction</p>
          
          {/* Design Direction B images */}
          {images.length > 8 && (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[8]} alt="Design Direction B" className="w-full h-auto" />
              </div>
              {images.length > 9 && (
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[9]} alt="Design Direction B variant" className="w-full h-auto" />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Contending Design */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contending Design</h2>
          <p className="text-gray-700 mb-6">In the biology industry, Biotechs expressed that they want to work with companies that are trustable and reliable. Accountability is both intangible and highly-value. My design aims to make the intangible tangible for our audience</p>
          <p className="text-gray-700 mb-6">Guerilla interviews showed that the dark theme looked advanced and tech-related; it caused a sense of reservation about the research services offered. Option B, while looking more common and expected, exuded the feelings of 'liable, trustworthy, clinical.' Presenting these findings to the team allowed us to move forward with Option B.</p>
          
          {/* Contending design images */}
          {images.length > 10 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(10, 13).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Contending design ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Responsive site */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cromatic responsive site design</h2>
          <p className="text-gray-500 mb-4">Pricing page</p>
          
          {/* Responsive site images */}
          {images.length > 13 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(13, 15).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Responsive design ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Design System */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design System</h2>
          <p className="text-gray-700 mb-4">For consistency, I limited the color palette, defined font styles and reusable components across landing pages.</p>
          
          {/* Design system images */}
          {images.length > 15 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(15, 17).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Design system ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Marketing Collaterals */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketing Collaterals</h2>
          <p className="text-gray-700 mb-4">To capture attention and position ourselves as a tech-first startup at Biotech events and communities, the dark sci-fi branding direction came in handy for event banners and collateral designs for Building in Bio, hosted in San Francisco, October 2022.</p>
          <p className="text-gray-500 mb-4">Building in Bio Event Banners and Marketing Collaterals</p>
          
          {/* Marketing collateral images */}
          {images.length > 17 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(17, 20).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Marketing collateral ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Unity in Duality */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unity in Duality</h2>
          <p className="text-gray-700 mb-4">Having two color schemes provided creative freedom for me to choose between them for visual designs, while having a united look and feel.</p>
          <p className="text-gray-500 mb-4">Social media posts on Linkedin</p>
          
          {/* Unity in duality images */}
          {images.length > 20 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(20, 22).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Unity in duality ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Content Strategy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Strategy</h2>
          <p className="text-gray-700 mb-4">As the first employee to join the startup when there was no product, the challenge is to test the market's appetite for our offerings with our landing pages. I designed simple mockups to illustrate potential value propositions to test users' interests.</p>
          
          {/* Content strategy images */}
          {images.length > 22 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(22, 24).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Content strategy ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Post Launch */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Launch</h2>
          
          {/* Post launch hero image */}
          {images.length > 24 && (
            <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[24]} alt="Post launch overview" className="w-full h-auto" />
            </div>
          )}
          
          <h3 className="font-semibold text-gray-800 mt-6 mb-2">Issue</h3>
          <p className="text-gray-700 mb-4">People are not signing up at their own discretion; they are only signing up after getting on a call with a Cromatic representative.</p>

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">Assumptions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Intent Misalignment: Our service differs from what the visitors came to our website for.</li>
            <li>Not trustworthy: We are a small company and may not seem credible.</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">Questions to test assumptions</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
            <li>Who are the visitors and where are they navigating from?</li>
            <li>What are the questions they have when they get on a call with us?</li>
          </ol>

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">Conducting investigation</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>After analysing the results from google analytics, I discovered that the most organic visitors are branded traffic. Since it is not a case of keyword and intent misalignment, assumption 1 can be eliminated.</li>
            <li>I gathered more evidence by asking the founders what are the questions customer had when they called us. Most frequent enquiries were: "What are the number of CROs we have on our platform?" "Do you have CROs for our specific need?"</li>
          </ul>
        </section>

        {/* Solutions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solutions</h2>
          
          <h3 className="font-semibold text-gray-800 mb-2">Establishing credibility</h3>
          <p className="text-gray-700 mb-4">Showcase partners, community and perks to position where we are in the Biotech Industry.</p>
          <p className="text-gray-500 mb-4">Community perks on landing pages</p>
          
          {/* Establishing credibility images */}
          {images.length > 25 && (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(25, 27).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Establishing credibility ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}

          <h3 className="font-semibold text-gray-800 mt-6 mb-2">Answering commonly ask questions visually</h3>
          <p className="text-gray-700 mb-4">Quickly showcasing the services research organizations that we can offer on our platform, without giving away too much (for strategic reasons).</p>
          
          {/* Visual answers images */}
          {images.length > 27 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.slice(27, 29).map((src, index) => (
                <div key={src} className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Visual answers ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Results */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>8% increase in conversion through landing pages</li>
            <li>16% increase in visits to pricing page</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Reflections</h3>
          <p className="text-gray-700">Curating a brand and designing landing pages from scratch was something I enjoy and am familiar with. What made the process even more exciting was the chance to use data to strategically enhance the design, thus jumpstarting growth.</p>
        </section>

        <div className="pt-8">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">← Back to Portfolio</Link>
        </div>
      </main>
    </div>
  );
}
