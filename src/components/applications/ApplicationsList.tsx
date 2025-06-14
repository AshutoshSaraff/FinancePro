
import { useState } from 'react';
import { useData, LoanApplication } from '@/context/DataContext';
import ApplicationItem from '@/components/applications/ApplicationItem';
import ApplicationDetails from '@/components/applications/ApplicationDetails';

interface ApplicationsListProps {
  adminView?: boolean;
  adminLevel?: 'admin1' | 'admin2' | 'admin3';
  customApplications?: LoanApplication[];
}

export default function ApplicationsList({
  adminView = false,
  adminLevel,
  customApplications
}: ApplicationsListProps) {
  const { currentUser, getUserApplications, getAdminApplications } = useData();
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  
  let applications: LoanApplication[] = [];
  
  if (customApplications) {
    applications = customApplications;
  } else if (adminView && adminLevel) {
    applications = getAdminApplications(adminLevel);
  } else if (currentUser) {
    applications = getUserApplications(currentUser.id);
  }
  
  if (applications.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">No applications found.</p>
        {!adminView && (
          <p className="text-sm text-gray-400 mt-2">
            Apply for a loan to get started.
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div>
      {selectedApplication ? (
        <div>
          <ApplicationDetails
            application={selectedApplication}
            adminView={adminView}
            adminLevel={adminLevel}
          />
          <Button
            onClick={() => setSelectedApplication(null)}
            variant="ghost"
            className="mt-4 text-gray-600"
          >
            ← Back to Applications List
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              onClick={() => setSelectedApplication(application)}
              className="cursor-pointer"
            >
              <ApplicationItem application={application} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// We need to add Button import
import { Button } from "@/components/ui/button";
