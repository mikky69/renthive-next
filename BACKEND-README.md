# RentHive Backend Documentation

This document provides an overview of the RentHive backend architecture and setup.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Hosting**: Vercel (recommended)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Database
DATABASE_URL=your-database-url
```

## Database Schema

### Tables

#### Properties

```sql
create table properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price integer not null,
  beds integer not null,
  baths integer not null,
  sqft integer not null,
  location text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  country text not null,
  type text not null check (type in ('apartment', 'house', 'condo', 'townhouse', 'other')),
  status text not null default 'available' check (status in ('available', 'rented', 'maintenance')),
  featured boolean not null default false,
  images text[] not null default '{}',
  amenities text[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null
);

-- Enable Row Level Security
alter table properties enable row level security;

-- Create policies for RLS
create policy "Public properties are viewable by everyone."
  on properties for select
  using (true);

create policy "Users can insert their own properties."
  on properties for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own properties."
  on properties for update
  using (auth.uid() = user_id);

create policy "Users can delete their own properties."
  on properties for delete
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index idx_properties_user_id on properties(user_id);
create index idx_properties_type on properties(type);
create index idx_properties_status on properties(status);
create index idx_properties_location on properties(location);
```

#### Favorites

```sql
create table favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  property_id uuid references properties not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, property_id)
);

-- Enable Row Level Security
alter table favorites enable row level security;

-- Create policies for RLS
create policy "Users can view their own favorites"
  on favorites for select
  using (auth.uid() = user_id);

create policy "Users can create their own favorites"
  on favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on favorites for delete
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index idx_favorites_user_id on favorites(user_id);
create index idx_favorites_property_id on favorites(property_id);
```

#### User Profiles (Optional)

```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  phone text,
  bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

-- Create policies for RLS
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using (true);

create policy "Users can update their own profile."
  on profiles for update
  using (auth.uid() = id);

-- Create a trigger to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## API Endpoints

### Properties

- `GET /api/properties` - Get all properties (with optional filters)
- `GET /api/properties/[id]` - Get a single property by ID
- `POST /api/properties` - Create a new property (requires auth)
- `PUT /api/properties/[id]` - Update a property (requires auth)
- `DELETE /api/properties/[id]` - Delete a property (requires auth)

### Favorites

- `GET /api/favorites` - Get user's favorite properties (requires auth)
- `POST /api/favorites` - Add property to favorites (requires auth)
- `DELETE /api/favorites?propertyId=[id]` - Remove property from favorites (requires auth)

### Upload

- `POST /api/upload` - Upload files to Supabase Storage (requires auth)
- `DELETE /api/upload` - Delete a file from Supabase Storage (requires auth)

## Authentication

RentHive uses Supabase Auth for authentication. The following authentication methods are supported:

- Email/Password
- Social Logins (Google, GitHub, etc.)
- Magic Links

### Protected Routes

Certain routes are protected and require authentication. These include:

- Property creation, update, and deletion
- Favorites management
- File uploads

## Error Handling

All API routes follow a consistent error response format:

```typescript
{
  error: string;  // Error message
  status?: number; // HTTP status code
  details?: any;   // Additional error details (optional)
}
```

## Local Development

1. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

2. Set up environment variables (see above)

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel

1. Push your code to a Git repository
2. Import the repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Testing

To run tests:

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
