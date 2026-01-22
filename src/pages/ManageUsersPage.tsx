import { useState, useMemo } from "react";
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
  const { users, userLoading, changeUserRole } = useUser();
  const { inventoryItems, inventoryLoading } = useInventory();
  const { catalogItems, catalogLoading } = useCatalog();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
 
  const isFullyLoaded = !userLoading && !inventoryLoading && !catalogLoading;

  const enrichedUsers = useMemo(() => {
    let search = '';
    if (searchTerm.length > 1) {
      search = searchTerm.toLowerCase();
    }  
    
    return users
      .filter((user) => {
        if (!searchTerm) return true;
        return (
          user.displayName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
        );
      })
      .map((user) => {
        // Run the heavy calculation here, once per user, only when data changes
        const { checkedOutQty } = buildInventoryView(
          user.email,
          inventoryItems,
          catalogItems
        );
        
        const count = Object.values(checkedOutQty).reduce(
          (sum, item) => sum + item.quantityCheckedOut, 
          0
        );

        return {
          ...user,
          checkedOutCount: count,
        };
      });
  }, [users, searchTerm, inventoryItems, catalogItems]);
  
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

  if (!isFullyLoaded) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-theme-secondary animate-pulse">Loading users...</div>
        </div>
      </PageLayout>
    );
  }

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
          users={enrichedUsers}
          allUsersCount={users.length}
          expandedUserId={expandedUserId}
          onToggleExpand={toggleExpand}
          onRoleChange={handleRoleChange}
        />
      </div>
    </PageLayout>
  );
}
