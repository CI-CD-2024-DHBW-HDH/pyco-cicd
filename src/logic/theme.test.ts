// theme.test.ts

import { Theme, themes } from './theme'; // Adjust the import path as necessary

describe('Theme Class', () => {
  // Test Constructor
  it('should correctly assign properties', () => {
    const testTheme = new Theme({
      primary: '#000',
      secondary: '#FFF',
      primaryAccent: '#F00',
      secondaryAccent: '#0F0',
      background: '#00F',
      name: 'Test Theme',
    });

    expect(testTheme.primary).toBe('#000');
    expect(testTheme.secondary).toBe('#FFF');
    expect(testTheme.primaryAccent).toBe('#F00');
    expect(testTheme.secondaryAccent).toBe('#0F0');
    expect(testTheme.background).toBe('#00F');
    expect(testTheme.name).toBe('Test Theme');
  });

  // Test CSS Method
  it('should return a correct CSS string', () => {
    const testTheme = new Theme({
      primary: '#000',
      secondary: '#FFF',
      primaryAccent: '#F00',
      secondaryAccent: '#0F0',
      background: '#00F',
      name: 'Test Theme',
    });

    const expectedCSS = '--primary: #000; --secondary: #FFF; --primaryAccent: #F00; --secondaryAccent: #0F0; --background: #00F';
    expect(testTheme.CSS()).toBe(expectedCSS);
  });

  // Test Themes Array
  describe('themes Array', () => {
    it('should contain correctly instantiated Theme objects', () => {
      themes.forEach(theme => {
        expect(theme).toBeInstanceOf(Theme);
        expect(typeof theme.name).toBe('string');
        expect(theme.CSS()).toContain('--primary: ');
        expect(theme.CSS()).toContain('--secondary: ');
        expect(theme.CSS()).toContain('--primaryAccent: ');
        expect(theme.CSS()).toContain('--secondaryAccent: ');
        expect(theme.CSS()).toContain('--background: ');
      });
    });
  });
});
