import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarkdownViewer from './MarkdownViewer.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { FileText } from 'lucide-react';

const docFiles = [
  { path: '/docs/executive-summary.md', title: 'Executive Summary' },
  { path: '/docs/strategy.md', title: 'Strategy' },
  { path: '/docs/database-schema.md', title: 'Database Schema' },
  { path: '/docs/provider-config.md', title: 'Provider Configuration' },
  { path: '/docs/architecture.md', title: 'Architecture' },
  { path: '/docs/milestones.md', title: 'Milestones' },
  { path: '/docs/checklist.md', title: 'Checklist' },
  { path: '/docs/kpi.md', title: 'KPIs' },
  { path: '/docs/cost-estimates.md', title: 'Cost Estimates' },
];

const DocumentationPage = ({ isDark }) => {
  const { docName } = useParams();
  const [currentDocPath, setCurrentDocPath] = useState('');

  useEffect(() => {
    if (docName) {
      const foundDoc = docFiles.find(doc => doc.path.includes(docName));
      if (foundDoc) {
        setCurrentDocPath(foundDoc.path);
      } else {
        setCurrentDocPath(''); // Handle case where docName doesn't match
      }
    } else if (docFiles.length > 0) {
      setCurrentDocPath(docFiles[0].path); // Default to first document if no docName in URL
    }
  }, [docName]);

  return (
    <div className="flex h-full">
      {/* Sidebar for document navigation */}
      <div className={`w-64 border-r ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <ScrollArea className="h-full p-4">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Documentation</h3>
          <nav className="space-y-2">
            {docFiles.map((doc) => (
              <Link 
                key={doc.path} 
                to={`/docs/${doc.path.split('/').pop().replace('.md', '')}`}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} ${currentDocPath === doc.path ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : ''}`}
              >
                <FileText className="h-4 w-4" />
                <span>{doc.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Main content area for MarkdownViewer */}
      <div className="flex-1 p-6 overflow-y-auto">
        {currentDocPath ? (
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
                {docFiles.find(doc => doc.path === currentDocPath)?.title || 'Documentation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownViewer filePath={currentDocPath} isDark={isDark} />
            </CardContent>
          </Card>
        ) : (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select a document from the sidebar.</div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPage;
