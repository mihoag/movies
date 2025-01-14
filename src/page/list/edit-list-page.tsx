import { useState } from 'react';
import FormList from '../../components/page/list/form-list';
import FormAdd from '../../components/page/list/form-add';
import FormDelete from '../../components/page/list/form-delete';

export default function ListEditor() {
  const [showEditDorm, setShowEditDorm] = useState(false);
  const [showAddEditItem, setShowAddEditItem] = useState(true);
  const [showDeleteList, setShowDeleteList] = useState(false);

  const handleEditListsClick = () => {
    setShowEditDorm(true);
    setShowAddEditItem(false);
    setShowDeleteList(false);
  };

  const handleAddEditItemsClick = () => {
    setShowEditDorm(false);
    setShowAddEditItem(true);
    setShowDeleteList(false);
  };

  const handleShowDeleteList = () => {
    setShowEditDorm(false);
    setShowAddEditItem(false);
    setShowDeleteList(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 px-8">
      {/* Sidebar */}
      <div
        className={`relative w-full lg:col-span-1 max-w-[250px] mb-4
        ] bg-white shadow-md 
          transform transition-transform duration-300 ease-in-out
          m-0 lg:m-4 max-h-[40vh] rounded-[10px] mx-4 ml-8
        `}
      >
        <div className="bg-[rgb(1,180,228)] rounded-t-[10px] text-white px-6 py-4 text-xl font-bold">Edit</div>

        <div className="py-5">
          <div
            onClick={handleEditListsClick}
            className={
              showEditDorm
                ? 'text-[rgb(1,180,228)] px-6 py-[11px] text-[15px] font-semibold'
                : 'text-[#666666] px-6 py-[11px] text-[15px] font-semibold cursor-pointer'
            }
          >
            Edit Lists
          </div>
          <div
            onClick={handleAddEditItemsClick}
            className={
              showAddEditItem
                ? 'text-[rgb(1,180,228)] px-6 py-[11px] text-[15px] font-semibold'
                : 'text-[#666666] px-6 py-[11px] text-[15px] font-semibold cursor-pointer'
            }
          >
            Add/Edit Items
          </div>
          <div
            onClick={handleShowDeleteList}
            className={
              showDeleteList
                ? 'text-[rgb(1,180,228)] px-6 py-[11px] text-[15px] font-semibold'
                : 'text-[#666666] px-6 py-[11px] text-[15px] font-semibold cursor-pointer'
            }
          >
            Delete List
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {showEditDorm && <FormList title={'Edit List'} />}
        {showAddEditItem && <FormAdd />}
        {showDeleteList && <FormDelete />}
      </div>
    </div>
  );
}
