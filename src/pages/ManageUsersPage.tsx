import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useUser } from "../contexts/UserContext";
import type { UserRole } from "../types/user";
import PageLayout from "./PageLayout";
import PageActionBar from "../components/PageActionBar";

export default function ManageUsersPage() {
  const { userProfile } = useAuth();
  const { users, changeUserRole } = useUser();
  const [searchTerm, setSearchTerm] = useState<string>('');
 
  let search = '';
  if (searchTerm.length > 1) {
    search = searchTerm.toLowerCase();
  }  

  const filteredUsers = users
    .filter((user) => {
      if (searchTerm === '') return true;
      return (
        user.displayName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );    
    })
  ;

  const handleRoleChange = (uid: string, newRole: UserRole) => {
    if (uid === userProfile!.uid && newRole === 'user') {
      if (!confirm('Are you sure you want to remove your admin privileges?')) {
        return;
      }
    }
    changeUserRole(uid, newRole);
  };

  return (
    <PageLayout>
      <PageActionBar
        leftSlot={null}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showTagFilter={false}
        showViewToggle={false}
        rightSlot={null}
      />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-theme-primary mb-2">Manage Users</h1>
          <p className="text-sm text-theme-secondary">Modify user roles and permissions</p>
        </div>

        {/* Table */}
        <div className="bg-theme-surface border border-theme rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-theme bg-theme-secondary/10">
                  <th className="w-[25%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                    Name
                  </th>
                  <th className="w-[30%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="w-[15%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                    Role
                  </th>
                  <th className="w-[15%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="w-[15%] px-6 py-3 text-left text-xs font-semibold text-theme-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-theme-secondary">
                      <p className="text-lg font-medium">No users found</p>
                      <p className="text-sm mt-2">Try adjusting your search</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.uid} className="hover:bg-theme-hover transition-colors">
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
                        <div className="text-sm text-theme-secondary">timestamp</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                          className="px-3 py-1.5 border border-theme rounded-md bg-theme-surface text-theme-primary text-sm font-medium hover:bg-theme-hover focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-theme-secondary">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </PageLayout>
  );
}