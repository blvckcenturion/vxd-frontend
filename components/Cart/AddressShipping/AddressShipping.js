import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping({ setAddress }) {
  
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

    
    
  return (
    <div className="address-shipping">
      <div className="title">Dirección de envió</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna direccion creada{" "}
            <Link href="/account">
              <a>añadir tu primera dirección.</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address({ address, addressActive, setAddressActive, setAddress }) {
    const changeAddress = () => {

        if (addressActive !== address._id) {
            setAddressActive(address._id);
            setAddress(address);
        } else {
            setAddressActive(null);
            setAddress(null);
        }
    
  };

    console.log(address)
  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={() => changeAddress()}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}