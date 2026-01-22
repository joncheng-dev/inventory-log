import { Fragment } from 'react';
import type { UserProfile, UserRole } from "../../types/user";
import { ChevronDown, ChevronRight, PackageIcon } from "../../assets/icons";
import ExpandedUserCheckout from "./ExpandedUserCheckout";

interface EnrichedUser extends UserProfile {
  checkedOutCount: number;
}

interface UsersTableProps {
  users: EnrichedUser[];
  allUsersCount: number;
  expandedUserId: string | null;
  onToggleExpand: (uid: string) => void;
  onRoleChange: (uid: string, newRole: UserRole) => void;
}

export default function UsersTable({
  users,
  allUsersCount,
  expandedUserId,
  onToggleExpand,
  onRoleChange,
}: UsersTableProps) {
  return (
    <>
      {/* Table */}
      <div className="bg-theme-surface border border-theme rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-theme bg-theme-secondary/10">
                <th className="w-12 px-4 py-3"></th>
                <th className="w-[25%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                  Name
                </th>
                <th className="w-[25%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                  Email
                </th>
                <th className="w-[15%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                  Role
                </th>
                <th className="w-[15%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                  Items
                </th>
                <th className="w-[20%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-theme-secondary">
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm mt-2">Try adjusting your search</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isExpanded = expandedUserId === user.uid;

                  return (
                    <Fragment key={user.uid}>
                      {/* Main Row */}
                      <tr className="hover:bg-theme-hover transition-colors">
                        <td className="px-4 py-4">
                          <button
                            onClick={() => onToggleExpand(user.uid)}
                            className="p-1 hover:bg-theme-hover rounded transition-colors text-theme-secondary"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? <ChevronDown /> : <ChevronRight />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-theme-primary">{user.displayName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-theme-secondary">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin'
                                ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400'
                                : 'bg-theme-secondary/20 text-theme-primary'
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-theme-secondary">
                            <PackageIcon />
                            <span>{user.checkedOutCount}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => onRoleChange(user.uid, e.target.value as UserRole)}
                            className="px-5 py-3 border border-theme rounded-md bg-theme-surface text-theme-primary text-sm font-medium hover:bg-theme-hover focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>

                      {/* Expanded Row - Checked Out Items */}
                      {isExpanded && (
                        <ExpandedUserCheckout
                          userEmail={user.email}
                          userId={user.uid}
                        />
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-theme-secondary">
        Showing {users.length} of {allUsersCount} users
      </div>
    </>
  );
}
