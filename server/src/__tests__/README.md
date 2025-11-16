# Test Suite for InterviewX Server

This directory contains comprehensive unit tests for the InterviewX server application.

## Test Files

- lib/env.test.js - Tests for environment configuration (54 tests)
- lib/inngest.test.js - Tests for Inngest functions (31 tests)
- models/User.model.test.js - Tests for User model (45 tests)
- setup.js - Global test setup

## Running Tests

First install dependencies: npm install

Then run: npm test
Watch mode: npm run test:watch
Coverage: npm run test:coverage

## Test Coverage

Total: 130 comprehensive test cases covering:
- Happy paths with valid inputs
- Edge cases and boundary conditions
- Error handling and failure scenarios
- Schema validation and constraints
- Database operations (CRUD)
- Event handlers and data transformation