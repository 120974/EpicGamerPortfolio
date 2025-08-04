interface RecycledProgram {
  id: string;
  title: string;
  type: 'about' | 'art';
  deletedAt: Date;
}

interface RecycleBinAppProps {
  recycledPrograms: RecycledProgram[];
  onRestore: (programId: string) => void;
  onEmptyRecycleBin: () => void;
}

export default function RecycleBinApp({ recycledPrograms, onRestore, onEmptyRecycleBin }: RecycleBinAppProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-3 h-full overflow-y-auto xp-scrollbar" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div className="mb-4 text-center pb-2" style={{ borderBottom: '1px solid #c0c0c0' }}>
        <h2 className="text-sm font-semibold" style={{ color: '#003c71', fontFamily: 'Tahoma, sans-serif' }}>
          Recycle Bin
        </h2>
        <p className="text-xs" style={{ color: '#666666' }}>
          {recycledPrograms.length} item{recycledPrograms.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Controls */}
      {recycledPrograms.length > 0 && (
        <div className="mb-4 flex space-x-2">
          <button 
            className="px-3 py-1 text-xs border transition-colors"
            style={{
              background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
              border: '1px solid #999999',
              fontFamily: 'Tahoma, sans-serif'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #e8f0fe 0%, #c6d9f7 100%)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)';
            }}
            onClick={onEmptyRecycleBin}
          >
            Empty Recycle Bin
          </button>
        </div>
      )}

      {/* Recycled Items */}
      {recycledPrograms.length === 0 ? (
        <div className="text-center p-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 border-2 flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(145deg, #f0f0f0 0%, #696969 100%)',
              borderColor: '#2f4f4f',
              borderRadius: '3px'
            }}
          >
            <span className="text-gray-600 text-xl">🗑</span>
          </div>
          <p className="text-xs" style={{ color: '#666666' }}>
            The Recycle Bin is empty.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recycledPrograms.map((program) => (
            <div 
              key={`${program.id}-${program.deletedAt.getTime()}`}
              className="flex items-center p-2 border-2 hover:bg-blue-50 transition-colors"
              style={{ 
                background: '#ffffff',
                borderColor: '#c0c0c0',
                borderStyle: 'inset',
                borderRadius: '2px'
              }}
            >
              <div 
                className="w-8 h-8 mr-3 border flex items-center justify-center"
                style={{
                  background: program.type === 'about' 
                    ? 'linear-gradient(145deg, #e6e6fa 0%, #9370db 100%)'
                    : 'linear-gradient(145deg, #ffe6e6 0%, #dc143c 100%)',
                  borderColor: program.type === 'about' ? '#8a2be2' : '#b22222',
                  borderRadius: '2px'
                }}
              >
                <span className="text-white text-xs">
                  {program.type === 'about' ? 'i' : '🎨'}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium">{program.title}</div>
                <div className="text-xs" style={{ color: '#666666' }}>
                  Deleted: {formatDate(program.deletedAt)}
                </div>
              </div>

              <button 
                className="px-2 py-1 text-xs border ml-2 transition-colors"
                style={{
                  background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                  border: '1px solid #999999',
                  fontFamily: 'Tahoma, sans-serif'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #e8f0fe 0%, #c6d9f7 100%)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)';
                }}
                onClick={() => onRestore(program.id)}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div 
        className="mt-4 p-2 border-2" 
        style={{ 
          background: '#f5f5f5', 
          borderColor: '#c0c0c0',
          borderStyle: 'inset'
        }}
      >
        <p className="text-xs" style={{ color: '#666666' }}>
          Drag programs to the Recycle Bin to delete them. Use "Restore" to bring them back to the desktop.
        </p>
      </div>
    </div>
  );
}