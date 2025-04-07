import React from "react";

const ApplicationList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          My Applications
        </h3>
        <div className="mt-6 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 mt-4">
          You haven't applied to any jobs yet. Browse available jobs and submit
          your first application!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-gray-900">My Applications</h3>
        <span className="text-sm text-gray-500">
          {applications.length} applications
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((application) => (
          <div
            key={application._id}
            className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-semibold text-gray-800">
                  {application.job.title}
                </h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-300">
                  Applied
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Applied on:{" "}
                  {new Date(application.appliedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 text-sm text-gray-700">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="font-medium">Company:</span>
                <span className="ml-1">
                  {application.job.postedBy?.name || "Unknown"}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">Location:</span>
                <span className="ml-1">{application.job.location}</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Salary:</span>
                <span className="ml-1">
                  ${application.job.salary?.toLocaleString()}/year
                </span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                  Job Description:
                </h5>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {application.job.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;
