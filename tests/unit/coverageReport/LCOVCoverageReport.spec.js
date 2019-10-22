import LCOVCoverageReport from '../../../src/corevageReport/LCOVCoverageReport';
import parsedLcov from '../../mocks/parse-lcov';

describe('lcov coverage report', () => {
  test('should raise an error in file does not exists', async () => {
    try {
      await LCOVCoverageReport.build('testPath/example.json');
    } catch (error) {
      expect(error).toStrictEqual(new Error('coverage report does not exists, check path'));
    }
  });

  test('should raise an error in file has corrupted content', async () => {
    try {
      await LCOVCoverageReport.build('tests/mocks/invalid-lcov.info');
    } catch (error) {
      expect(error).toStrictEqual('Failed to parse string');
    }
  });

  test('should parse report content', async () => {
    const report = await LCOVCoverageReport.build('tests/mocks/lcov.info');

    expect(report.Report).toStrictEqual(parsedLcov);
  });

  test('should check is line of file should be covered', async () => {
    const report = await LCOVCoverageReport.build('tests/mocks/lcov.info');
    const filePath = 'src/reducers/delivery/delivery.js';

    expect(report.isLineShouldBeCovered(filePath, 3)).toBeTruthy();
    expect(report.isLineShouldBeCovered(filePath, 9)).toBeTruthy();
    expect(report.isLineShouldBeCovered(filePath, 11)).toBeTruthy();
    expect(report.isLineShouldBeCovered(filePath, 17)).toBeTruthy();
    expect(report.isLineShouldBeCovered(filePath, 10)).toBeFalsy();
    expect(report.isLineShouldBeCovered(filePath, 70)).toBeFalsy();
  });
});
