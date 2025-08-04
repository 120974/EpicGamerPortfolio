export default function MyDocumentsApp() {
  const resumeData = {
    name: "Rishith Chintala",
    contact: {
      email: "rishith.chintala@gmail.com",
      phone: "(470) 908-7215",
      location: "Suwanee, GA"
    },
    workExperience: [
      {
        company: "Lambert Engineering",
        position: "Student & Intern",
        period: "Aug. 2024 – Present",
        location: "Suwanee, GA",
        responsibilities: [
          "Learn engineering concepts and how to implement them on active projects.",
          "Equipment maintenance and project work.",
          "Knowledgeable in 3d printers and woodworking."
        ]
      },
      {
        company: "LaundroLab",
        position: "Intern",
        period: "Aug. 2024 – Present",
        location: "Suwanee, GA",
        responsibilities: [
          "Making marketing calls to local businesses.",
          "Social media marketing, Creating and designing apparel.",
          "Creating new laundry deals for business development.",
          "Completely reworking all marketing systems to prioritize more customer engagement."
        ]
      }
    ],
    education: {
      school: "Lambert High School",
      period: "Aug 2023 - Present",
      location: "Suwanee, GA",
      pathways: "Marketing, Business, and Engineering Pathways",
      gpa: "3.86",
      coursework: "Marketing & Entrepreneurship; Banking, Investing, & Insurance; Engineering Concepts.",
      roles: "Lambert Robotics Marketing and Lambert XR Marketing Officer."
    },
    skills: {
      software: "Adobe Photoshop, Adobe Illustrator, Canva, Unity Game Engine, Unreal Game Engine, Blender, and Solidworks.",
      productivity: "Google Suit and Microsoft Suit.",
      languages: "English, Telugu, Spanish, Javascript, C ++, Python"
    },
    extracurriculars: [
      {
        organization: "Lambert TSA",
        position: "Competitor",
        period: "Aug 2022 - Present",
        location: "Suwanee, GA",
        achievements: [
          {
            title: "TSA Tech Day 2022-2024",
            competitions: [
              {
                name: "Alternative Energy Design - Rubber Band Powered Plane",
                description: "Learned about aerodynamics while constructing a glider."
              },
              {
                name: "Conceptual Design - CO2 Dragster",
                description: "Learned and applied basic engineering concepts and physics to create a CO2 Dragster."
              },
              {
                name: "Mousetrap Car Challenge",
                description: "Learned and applied basic engineering concepts and physics to create and optimize a mousetrap car."
              }
            ]
          },
          {
            title: "TSA State Leadership Conference 2023-2024",
            competitions: [
              {
                name: "On-demand Video Production",
                description: "Applied audio-visual skills to create a 2-minute short film."
              }
            ]
          }
        ]
      },
      {
        organization: "Lambert Robotics",
        position: "Team Member",
        period: "Aug 2024- Present",
        location: "Suwanee, GA",
        achievements: [
          {
            title: "Marketing Team Member - Teacher",
            competitions: [
              {
                name: "Teaching Adobe Illustrator to new team members",
                description: "Improved teaching and social skills"
              }
            ]
          },
          {
            title: "Marketing Team Member - Member",
            competitions: [
              {
                name: "Designed multiple pieces of club apparel, marketing material, documentation, and assets.",
                description: "Designed T-shirts, Stickers, Hoodies, and Logos."
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="h-full overflow-y-auto bg-white p-6 xp-scrollbar" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4" style={{ borderBottom: '2px solid #003c71' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#003c71' }}>
          {resumeData.name}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{resumeData.contact.email} ❖ {resumeData.contact.phone} ❖ {resumeData.contact.location}</div>
        </div>
      </div>

      {/* Work Experience */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          WORK EXPERIENCE
        </h3>
        {resumeData.workExperience.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-sm">{job.company}</h4>
                <p className="text-sm text-gray-600">{job.position}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{job.period}</span>
                <div className="text-sm text-gray-500">{job.location}</div>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
              {job.responsibilities.map((resp, respIndex) => (
                <li key={respIndex}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          EDUCATION
        </h3>
        <div className="mb-3">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h4 className="font-semibold text-sm">{resumeData.education.school}</h4>
              <p className="text-sm text-gray-600">{resumeData.education.pathways}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">{resumeData.education.period}</span>
              <div className="text-sm text-gray-500">{resumeData.education.location}</div>
            </div>
          </div>
          <div className="text-sm text-gray-700 space-y-1 ml-4">
            <p><strong>GPA:</strong> {resumeData.education.gpa}</p>
            <p><strong>Relevant Coursework:</strong> {resumeData.education.coursework}</p>
            <p><strong>Leadership Roles:</strong> {resumeData.education.roles}</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          SKILLS
        </h3>
        
        <div className="text-sm text-gray-700 space-y-2 ml-4">
          <p><strong>Proficient in:</strong> {resumeData.skills.software}</p>
          <p><strong>Productivity:</strong> {resumeData.skills.productivity}</p>
          <p><strong>Known languages:</strong> {resumeData.skills.languages}</p>
        </div>
      </section>

      {/* Extracurriculars */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 pb-1" style={{ 
          color: '#003c71', 
          borderBottom: '1px solid #cccccc' 
        }}>
          EXTRACURRICULARS
        </h3>
        
        {resumeData.extracurriculars.map((activity, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-sm">{activity.organization}</h4>
                <p className="text-sm text-gray-600">{activity.position}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{activity.period}</span>
                <div className="text-sm text-gray-500">{activity.location}</div>
              </div>
            </div>
            
            {activity.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="mb-3 ml-2">
                <h5 className="text-sm font-medium text-gray-800 mb-1">▪ {achievement.title}</h5>
                {achievement.competitions.map((comp, compIndex) => (
                  <div key={compIndex} className="ml-4 mb-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">o {comp.name}</span>
                      {comp.description && (
                        <>
                          <br />
                          <span className="ml-4 text-gray-600">▪ {comp.description}</span>
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Footer */}
      <div className="text-center mt-8 pt-4" style={{ borderTop: '1px solid #cccccc' }}>
        <p className="text-xs text-gray-500 mb-2">
          Resume displayed in Windows XP My Documents - {new Date().getFullYear()}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} - Professional Portfolio
        </p>
      </div>
    </div>
  );
}