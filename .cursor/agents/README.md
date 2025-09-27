# Cursor Background Agents Configuration

This directory contains configuration files for Cursor background agents that automate various aspects of the Foxhole Materials Calculator development workflow.

## Available Agents

### 1. Test Automation Agent (`test-automation.yml`)
**Purpose**: Automatically generates and maintains tests for all code changes
**Triggers**: File changes, new files, before commit
**Key Features**:
- Generates comprehensive unit and integration tests
- Maintains 100% test coverage requirement
- Updates existing tests when code changes
- Validates test accuracy and coverage

### 2. Code Quality Agent (`code-quality.yml`)
**Purpose**: Maintains code quality, formatting, and linting standards
**Triggers**: File save, before commit, scheduled daily
**Key Features**:
- Automatically fixes ESLint issues
- Applies Prettier formatting consistently
- Validates TypeScript types
- Runs relevant tests after code changes

### 3. Recipe Validation Agent (`recipe-validation.yml`)
**Purpose**: Validates recipe data consistency and accuracy
**Triggers**: Recipe file changes, scheduled daily/weekly, before commit
**Key Features**:
- Validates recipe structure and math
- Checks material references and enum consistency
- Tests calculations with known examples
- Suggests recipe improvements and updates

### 4. Performance Monitoring Agent (`performance-monitoring.yml`)
**Purpose**: Monitors and optimizes build performance and bundle size
**Triggers**: File changes, build events, scheduled daily/weekly
**Key Features**:
- Monitors build times and bundle size
- Analyzes performance metrics
- Suggests optimizations
- Tracks performance regressions

## Agent Configuration

Each agent is configured with:
- **Triggers**: When the agent should activate
- **Tasks**: What the agent should do
- **Conditions**: Under what circumstances tasks should run
- **Validation**: How to verify success
- **Configuration**: Specific settings and thresholds

## Integration with Development Workflow

These agents integrate seamlessly with your existing development workflow:

1. **Development**: Agents run automatically during file changes and saves
2. **Pre-commit**: Agents validate code before commits
3. **CI/CD**: Agents work with existing GitHub Actions workflows
4. **Scheduled**: Agents run maintenance tasks on schedule

## Monitoring and Notifications

Agents provide:
- Success/failure notifications
- Detailed error reporting
- Performance metrics tracking
- Optimization suggestions

## Customization

Each agent can be customized by editing the respective YAML configuration files. Common customizations include:
- Adjusting trigger conditions
- Modifying task priorities
- Changing validation criteria
- Updating notification settings

## Troubleshooting

If agents are not working as expected:
1. Check agent configuration files for syntax errors
2. Verify trigger conditions are met
3. Review validation criteria
4. Check Cursor agent logs for error messages

## Best Practices

1. **Start with Test Automation**: This provides the most immediate value
2. **Monitor Performance**: Keep an eye on agent performance impact
3. **Customize Thresholds**: Adjust based on your project's specific needs
4. **Regular Review**: Periodically review agent effectiveness and adjust configurations
