import React, { useState, useRef, useEffect } from 'react';


interface Props {
  onAddBookmark: () => void;
  onRemoveBookmark: () => void;
}

const Menu: React.FC<Props> = ({ onAddBookmark, onRemoveBookmark }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Show menu when clicked
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // If you click outside the menu it will close
  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      <div className="menu" onClick={handleMenuToggle}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      {showMenu && (
        <div className="menu-items">
          <button className="add-bookmark" onClick={onAddBookmark}>
            Add to Bookmarks
          </button>
          <button className="remove-bookmark" onClick={onRemoveBookmark}>
            Remove Bookmark
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
