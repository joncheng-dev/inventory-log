import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useInventory } from "../contexts/InventoryContext";
import { useCatalog } from "../contexts/CatalogContext";
import type { UserRole } from "../types/user";
import PageLayout from "./PageLayout";
import PageActionBar from "../components/PageActionBar";
import UsersTable from "../components/users/UsersTable";
import { buildInventoryView } from "../utils/inventory";

export default function ManageUsersPage() {
  const { userProfile } = useAuth();
  const { users, changeUserRole } = useUser();
  const { inventoryItems } = useInventory();
  const { catalogItems } = useCatalog();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
 
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
    });

  const handleRoleChange = (uid: string, newRole: UserRole) => {
    if (uid === userProfile!.uid && userProfile!.role === 'admin' && newRole === 'user') {
      if (!confirm('Are you sure you want to remove your admin privileges?')) {
        return;
      } 
    }
    changeUserRole(uid, newRole);
  };

  const toggleExpand = (uid: string) => {
    setExpandedUserId(expandedUserId === uid ? null : uid);
  };

  // Get total count of checked-out items for a user
  const getUserCheckedOutCount = (userEmail: string) => {
    const { checkedOutQty } = buildInventoryView(
      userEmail,
      inventoryItems,
      catalogItems
    );
    return Object.values(checkedOutQty).reduce((sum, item) => sum + item.quantityCheckedOut, 0);
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
          <p className="text-sm text-theme-secondary">Modify user roles and permissions, view checked out items</p>
        </div>

        <UsersTable
          users={filteredUsers}
          allUsersCount={users.length}
          expandedUserId={expandedUserId}
          onToggleExpand={toggleExpand}
          onRoleChange={handleRoleChange}
          getUserCheckedOutCount={getUserCheckedOutCount}
        />
      </div>
    </PageLayout>
  );
}
