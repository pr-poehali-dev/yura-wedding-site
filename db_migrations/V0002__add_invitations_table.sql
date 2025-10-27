-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    invite_code VARCHAR(100) UNIQUE NOT NULL,
    max_guests INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_invite_code ON invitations(invite_code);
CREATE INDEX idx_active_invitations ON invitations(is_active) WHERE is_active = true;

-- Add invite_code to rsvp_responses to track which invitation was used
ALTER TABLE rsvp_responses ADD COLUMN invite_code VARCHAR(100);
CREATE INDEX idx_rsvp_invite_code ON rsvp_responses(invite_code);