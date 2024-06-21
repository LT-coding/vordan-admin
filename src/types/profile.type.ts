type Value = {
  value: string | null
} | null

type Contact = {
  id: number
  name: string
  email: string
  extension_number: string
  details: {
    phone1: Value
    phone2: Value
    facebook: Value
    linkedin: Value
    web_site: Value
    business_address: Value
    business_city: Value
    business_state: Value
    business_zip: Value
    address: Value
    city: Value
    state: Value
    zip: Value
  } | null
}

type User = {
  id: number
  requester_id: string
  adjuster_type: string
  client_type: string
}

export type Account = {
  contact: Contact
  user: User
}
