import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiKey, createTenant } from './features/tenant/tenantSlice';
import { fetchMenu } from './features/menu/menuSlice';

function App() {
  const dispatch = useDispatch();

  const apiKey = useSelector((state) => state.tenant.apiKey);
  const tenantApiKey = useSelector((state) => state.tenant.tenantApiKey);
  const tenantStatus = useSelector((state) => state.tenant.status);
  const tenantError = useSelector((state) => state.tenant.error);

  const menu = useSelector((state) => state.menu.items);
  const menuStatus = useSelector((state) => state.menu.status);
  const menuError = useSelector((state) => state.menu.error);

  // Step 1: Fetch general API key on mount
  useEffect(() => {
    dispatch(fetchApiKey());
  }, [dispatch]);

  // Step 2: Once general API key received, create tenant
  useEffect(() => {
    if (apiKey) {
      dispatch(createTenant('my-awesome-food-truck'));
    }
  }, [apiKey, dispatch]);

  // Step 3: Once tenant API key received, fetch menu
  useEffect(() => {
    if (tenantApiKey) {
      dispatch(fetchMenu());
    }
  }, [tenantApiKey, dispatch]);

  return (
    <div>
      <h1>Food Truck Menu</h1>

      {tenantStatus === 'loading' && <p>Loading tenant info...</p>}
      {tenantError && <p style={{ color: 'red' }}>Error: {tenantError}</p>}

      {menuStatus === 'loading' && <p>Loading menu...</p>}
      {menuError && <p style={{ color: 'red' }}>Error: {menuError}</p>}

      <ul>
        {Array.isArray(menu) && menu.length > 0 ? (
          menu.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}
            </li>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
