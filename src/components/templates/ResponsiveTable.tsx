'use client';

interface ResponsiveTableProps {
  headers: string[];
  children: React.ReactNode;
  minWidth?: string;
}

export default function ResponsiveTable({ headers, children, minWidth = '600px' }: ResponsiveTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <div className="overflow-hidden rounded-lg border border-[#E8ECEF]" style={{ minWidth }}>
        <table className="w-full text-sm">
          <thead className="bg-[#1B3A5C] text-white">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECEF]">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

