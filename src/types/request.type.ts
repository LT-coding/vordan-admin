// const request = {
//     "id": 1248,
//     "created_date": "06/07/2024",
//     "created_at": "12:51 PM",
//     "canceled": null,
//     "insurance_claim": {
//     "id": 1041,
//     "insurance_company": {
//         "id": 19,
//         "company_name": "sadfsadf"
//     },
//     "total_ale": "324324.00",
//     "set_budget": "234.00",
//     "sec_dep_paid_by": "tbd"
// }
//     "claim_number": 24060029,
//     "status": "new",
//     "entered_user": {
//         "id": 6,
//         "name": "asdfdsf",
//         "email": "gcgdirhei@example.com",
//         "signature": null,
//         "avatar": null,
//         "status": null,
//         "role": null,
//         "permission": false,
//         "companies_ids": [],
//         "employee_id": null
//     },
//     "assigned_user": {
//         "id": 6,
//         "name": "asdfdsf",
//         "email": "gcgdirhei@example.com",
//         "signature": null,
//         "avatar": null,
//         "status": null,
//         "role": null,
//         "permission": false,
//         "companies_ids": [],
//         "employee_id": null
//     },
//     "claim_type": null,
//     "tenant": {
//         "id": 1223,
//         "contact": {
//             "id": 5294,
//             "name": "sdafsdf",
//             "status": "active",
//             "details": []
//         },
//         "claim_id": null,
//         "family_member": []
//     },
//     "lost_property": {
//         "id": 44703,
//         "from_vendors": false,
//         "type": "lost",
//         "status": "4",
//         "sqft": 0,
//         "all_inclusive": false,
//         "price": "0.00",
//         "detail": {
//             "bedroom_count": "0",
//             "bathroom_count": "0",
//             "auto_suggestion": false,
//             "from_zillow": false,
//             "listed_online": false
//         },
//         "extra": null,
//         "address": {
//             "id": 15036,
//             "property_id": "44703",
//             "address": null,
//             "city": "dfgdfgdfg",
//             "state": "7",
//             "zip": null,
//             "zpid": null,
//             "unit": null,
//             "latitude": null,
//             "longitude": null,
//             "created_at": "2024-06-07T12:51:23.000000Z",
//             "updated_at": "2024-06-07T12:51:23.000000Z",
//             "deleted_at": null
//         },
//         "entered_date": "06-07-2024 @ 12:51 PM",
//         "updated_date": "06-07-2024 @ 12:51 PM"
//     },
//     "requested_property": {
//         "id": 1155,
//         "claim_id": "1248",
//         "furnished": 0,
//         "initial_term": 95
//     }
// }

export type RequestType = {
  id: number
  created_date: string
  created_at: string
  canceled: string | null
  insurance_claim: {
    id: number
    insurance_company: {
      id: number
      company_name: string
    }
    total_ale: string
    set_budget: string
    sec_dep_paid_by: string
  } | null
  claim_number: number
  status: string
  // entered_user: {
  //   id: number
  //   name: string
  //   email: string
  //   signature: string | null
  //   avatar: string | null
  //   status: string | null
  //   role: string | null
  //   permission: boolean
  //   companies_ids: number[]
  //   employee_id: string | null
  // }
  // assigned_user: {
  //   id: number
  //   name: string
  //   email: string
  //   signature: string | null
  //   avatar: string | null
  //   status: string | null
  //   role: string | null
  //   permission: boolean
  //   companies_ids: number[]
  //   employee_id: string | null
  // }
  claim_type: string | null
  tenant: {
    id: number
    contact: {
      id: number
      name: string
      status: string
      details: string[]
    }
    claim_id: string | null
    family_member: FamilyMember[]
  }
  lost_property: {
    id: number
    from_vendors: boolean
    type: string
    status: string
    sqft: number
    all_inclusive: boolean
    price: string
    detail: {
      bedroom_count: string
      bathroom_count: string
      // auto_suggestion: boolean
      // from_zillow: boolean
      // listed_online: boolean
    }
    extra: string | null
    address: {
      id: number
      property_id: string
      address: string | null
      city: string
      state: string
      zip: string | null
      // zpid: string | null
      unit: string | null
      // latitude: string | null
      // longitude: string | null
      // created_at: string
      // updated_at: string
      // deleted_at: string | null
    }
    // entered_date: string
    // updated_date: string
  }
  requested_property: {
    id: number
    claim_id: string
    // furnished: number
    initial_term: number
  }
}

export type RequestIndexType = {
  id: number
  created_date: string
  client_claim_number: number
  claim_number: number
  reference_number: string
  status: string
  tenant: {
    contact: {
      name: string
    }
  }
  lost_property: {
    address: {
      city: string
      state: string
      zip: string
    }
  }
}

export type SelectType = {
  id: number
  name: string
  short_name: string
  order: string
  type: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type ClientType = {
  id: number
  name: string
  type: string
  abbr: string
  per_day: string | null
  per_month: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type AllSelects = {
  adjuster_types: SelectType[]
  client_types: ClientType[]
  claim_statuses: string[]
  family_member_types: SelectType[]
  initial_terms: SelectType[]
  sec_dep_paid_by: string[]
}

export type FamilyMember = {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
}

export type Dog = {
  id: string
  dog_id: string
  wgt: string
  note: string
}

export type Extensions = {
  id: number
  extend_from: string
  extend_to: string
  pricing: {
    our: {
      total_rent: string | null
      total_rent_type: string | null
      per_month_type: string | null
      straight_month_type: string | null
      total_rent_for_show: string | null
      commission_total: string
      extra_date: string | null
      our_rent: string | null
    }
  }
}
