-- Create RSVP responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('yes', 'no')),
    guests INTEGER DEFAULT 1,
    alcohol VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wishes table
CREATE TABLE IF NOT EXISTS wishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_rsvp_created_at ON rsvp_responses(created_at DESC);
CREATE INDEX idx_wishes_created_at ON wishes(created_at DESC);