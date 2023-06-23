import { post, get } from '../../utility/client';

const addBillingAddress = (body) => {
  return post('create/billing-address', body);
};

const getBillingAddress = () => {
  return get('billing-address')
}

const deleteBillingAddresss = (billing_address_id) => {
  return post(`delete/billing-address/${billing_address_id}`)
}

const activeCategoryData = (id, body) => {
  return post(`active-inactive/category/${id}`, body)
}

const getEditBillingAddressData = (billing_address_id) => {
  return get(`edit/billing-address/${billing_address_id}`)
}

const updateAddBillingAddressData = (billing_address_id, body) => {
  return post(`update/billing-address/${billing_address_id}`, body)
}

export { addBillingAddress, getBillingAddress, deleteBillingAddresss, activeCategoryData, getEditBillingAddressData, updateAddBillingAddressData };