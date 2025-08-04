export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white xp-scrollbar" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4" style={{ borderBottom: '2px solid #003c71' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#003c71' }}>
          Rishith Chintala
        </h1>
        <p className="text-base text-gray-600">
          Student, Developer & Creator of Windows XP Portfolio
        </p>
      </div>

      {/* About Me */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          About Me
        </h2>
        
        <p className="text-sm leading-relaxed text-gray-700 mb-3">
          Hi! I'm Rishith Chintala, a high school student at Lambert High School with a passion for 
          technology, design, and creative problem-solving. I'm currently pursuing pathways in 
          Marketing, Business, and Engineering while actively participating in robotics and 
          technology student organizations.
        </p>
        
        <p className="text-sm leading-relaxed text-gray-700 mb-3">
          I created this Windows XP Portfolio as a tribute to the classic Windows XP operating system while 
          showcasing my professional work and projects. This interactive experience combines my love for 
          retro technology aesthetics with a comprehensive portfolio presentation.
        </p>

        <p className="text-sm leading-relaxed text-gray-700">
          When I'm not coding or working on projects, you can find me participating in TSA 
          competitions, creating marketing materials for Lambert Robotics, or learning new 
          technologies and design tools.
        </p>
      </section>

      {/* Current Activities */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          What I'm Up To
        </h2>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium mb-1" style={{ color: '#003c71' }}>Education</h3>
            <p className="text-sm text-gray-700">
              Currently a student at Lambert High School (Class of 2026) with a 3.86 GPA, 
              focusing on Marketing & Entrepreneurship, Banking & Insurance, and Engineering Concepts.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1" style={{ color: '#003c71' }}>Work Experience</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Lambert Engineering:</strong> Student & Intern learning engineering concepts and 3D printing</li>
              <li>• <strong>LaundroLab:</strong> Marketing Intern working on business development and social media</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1" style={{ color: '#003c71' }}>Extracurriculars</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Lambert Robotics:</strong> Marketing Team Member and Teacher</li>
              <li>• <strong>Lambert TSA:</strong> Competitor in video production and engineering challenges</li>
              <li>• <strong>Lambert XR:</strong> Marketing Officer exploring extended reality technologies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills & Interests */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          Skills & Interests
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Design & Creative</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Adobe Photoshop & Illustrator</li>
              <li>• Canva & Design Systems</li>
              <li>• 3D Modeling (Blender, SolidWorks)</li>
              <li>• Marketing Materials & Branding</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Technology & Development</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• JavaScript, C++, Python</li>
              <li>• Unity & Unreal Game Engines</li>
              <li>• 3D Printing & Woodworking</li>
              <li>• Web Development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Portfolio XP */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          About This Windows XP Portfolio
        </h2>
        
        <p className="text-sm leading-relaxed text-gray-700 mb-3">
          This Windows XP Portfolio is a nostalgic journey back to the classic operating system era, featuring an interactive 
          desktop environment showcasing my professional work across photography, 3D design, and 2D design. The project 
          combines authentic Windows XP visual elements with comprehensive portfolio presentation.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Features</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Authentic Windows XP interface</li>
              <li>• Draggable desktop icons and windows</li>
              <li>• Interactive portfolio galleries</li>
              <li>• Dark mode toggle</li>
              <li>• Functional system applications</li>
              <li>• Retro games and entertainment</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">4 Portfolio Pages</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Photography Portfolio</li>
              <li>• 3D Design & Visualization</li>
              <li>• 2D Design & Graphics</li>
              <li>• Plus comprehensive About section</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          Get In Touch
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: '#808080', borderRadius: '2px' }}>
              <span className="text-xs">📞</span>
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-gray-600">(470) 908-7215</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: '#808080', borderRadius: '2px' }}>
              <span className="text-xs">✉️</span>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <a 
                href="mailto:rishith.chintala@gmail.com" 
                className="text-sm text-blue-600 hover:underline"
              >
                rishith.chintala@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: '#808080', borderRadius: '2px' }}>
              <span className="text-xs">📷</span>
            </div>
            <div>
              <p className="text-sm font-medium">Instagram</p>
              <a 
                href="https://www.instagram.com/the_meridian_collection?utm_source=ig_web_button_share_sheet&igsh=MXdzOW5xdjdlcTVkYQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                @the_meridian_collection
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: '#808080', borderRadius: '2px' }}>
              <span className="text-xs">💼</span>
            </div>
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/in/rishith-chintala-012553232"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Rishith Chintala
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mt-6 pt-4" style={{ borderTop: '1px solid #cccccc' }}>
        <p className="text-xs text-gray-500 mb-2">
          Thanks for visiting my Windows XP Portfolio!
        </p>
        <p className="text-xs text-gray-400">
          Created with passion for retro computing and modern portfolio presentation
        </p>
      </div>
    </div>
  );
}