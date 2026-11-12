import http from 'http';

const BASE_URL = process.env.TARGET_URL || 'http://localhost:3000';
const parsedUrl = new URL(BASE_URL);

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 300,
  maxFreeSockets: 100,
  timeout: 10000,
});

const ENDPOINTS = [
  { path: '/', method: 'GET', weight: 30, name: 'Home Landing' },
  { path: '/dsa', method: 'GET', weight: 25, name: 'DSA Problem Hub' },
  { path: '/core-cs', method: 'GET', weight: 15, name: 'Core CS Syllabus' },
  { path: '/aptitude', method: 'GET', weight: 10, name: 'Aptitude Hub' },
  { path: '/resume-checker', method: 'GET', weight: 5, name: 'Resume Checker Page' },
  { path: '/login', method: 'GET', weight: 5, name: 'Login Page' },
  { path: '/api/chat', method: 'GET', weight: 5, name: 'AI Status & Telemetry' },
  { path: '/api/auth/session/status', method: 'GET', weight: 5, name: 'Auth Session Check' },
];

function selectEndpoint() {
  const totalWeight = ENDPOINTS.reduce((acc, e) => acc + e.weight, 0);
  let random = Math.random() * totalWeight;
  for (const ep of ENDPOINTS) {
    if (random < ep.weight) return ep;
    random -= ep.weight;
  }
  return ENDPOINTS[0];
}

function sendRequest(endpoint) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = http.request(
      {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 80,
        path: endpoint.path,
        method: endpoint.method,
        agent: httpAgent,
        headers: {
          'User-Agent': 'StackUp-LoadTester/2.0 (200-User Real-World Simulation)',
          Accept: 'text/html,application/json,*/*',
          Connection: 'keep-alive',
        },
        timeout: 8000,
      },
      (res) => {
        let bodyLength = 0;
        res.on('data', (chunk) => {
          bodyLength += chunk.length;
        });
        res.on('end', () => {
          const latency = Date.now() - startTime;
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 400,
            statusCode: res.statusCode,
            latency,
            endpoint: endpoint.name,
            path: endpoint.path,
            bodyLength,
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        statusCode: 408,
        latency: Date.now() - startTime,
        endpoint: endpoint.name,
        path: endpoint.path,
        error: 'ETIMEDOUT',
      });
    });

    req.on('error', (err) => {
      resolve({
        success: false,
        statusCode: 599,
        latency: Date.now() - startTime,
        endpoint: endpoint.name,
        path: endpoint.path,
        error: err.code || err.message,
      });
    });

    req.end();
  });
}

function calculatePercentiles(latencies) {
  if (latencies.length === 0) return { min: 0, median: 0, p90: 0, p95: 0, p99: 0, max: 0, mean: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const getP = (p) => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
  const sum = sorted.reduce((a, b) => a + b, 0);
  return {
    min: sorted[0],
    mean: Math.round(sum / sorted.length),
    median: getP(50),
    p90: getP(90),
    p95: getP(95),
    p99: getP(99),
    max: sorted[sorted.length - 1],
  };
}

async function runConcurrencyStage(concurrency, durationSec = 4) {
  console.log(`\n============================================================`);
  console.log(`STAGE: Testing Concurrency = ${concurrency} simultaneous users`);
  console.log(`============================================================`);

  const results = [];
  const statusCounts = {};
  const endpointStats = {};
  const startTime = Date.now();
  const endTime = startTime + durationSec * 1000;

  // Active virtual worker loop
  async function userWorker(workerId) {
    while (Date.now() < endTime) {
      const endpoint = selectEndpoint();
      const res = await sendRequest(endpoint);
      results.push(res);

      statusCounts[res.statusCode] = (statusCounts[res.statusCode] || 0) + 1;
      if (!endpointStats[res.endpoint]) {
        endpointStats[res.endpoint] = { total: 0, success: 0, latencies: [] };
      }
      endpointStats[res.endpoint].total++;
      if (res.success) endpointStats[res.endpoint].success++;
      endpointStats[res.endpoint].latencies.push(res.latency);

      // Brief simulated user think-time between 10ms - 50ms
      await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 40) + 10));
    }
  }

  // Spawn concurrency number of parallel user workers
  const workers = [];
  for (let i = 0; i < concurrency; i++) {
    workers.push(userWorker(i));
  }
  await Promise.all(workers);

  const durationMs = Date.now() - startTime;
  const totalRequests = results.length;
  const successfulRequests = results.filter((r) => r.success).length;
  const failedRequests = totalRequests - successfulRequests;
  const errorRate = totalRequests > 0 ? ((failedRequests / totalRequests) * 100).toFixed(2) : 0;
  const throughput = Math.round((totalRequests / (durationMs / 1000)) * 10) / 10;
  const latencies = results.map((r) => r.latency);
  const percentiles = calculatePercentiles(latencies);

  console.log(`Results for ${concurrency} Users:`);
  console.log(`  - Total Requests: ${totalRequests}`);
  console.log(`  - Successful: ${successfulRequests}`);
  console.log(`  - Failed: ${failedRequests} (${errorRate}%)`);
  console.log(`  - Throughput: ${throughput} req/s`);
  console.log(`  - Latencies: Mean=${percentiles.mean}ms | Median=${percentiles.median}ms | P95=${percentiles.p95}ms | P99=${percentiles.p99}ms | Max=${percentiles.max}ms`);
  console.log(`  - Status Distribution: ${JSON.stringify(statusCounts)}`);

  return {
    concurrency,
    durationMs,
    totalRequests,
    successfulRequests,
    failedRequests,
    errorRate: Number(errorRate),
    throughput,
    percentiles,
    statusCounts,
    endpointStats,
  };
}

async function main() {
  console.log(`Starting StackUp 200-User Real-World Concurrency Audit against ${BASE_URL}...`);
  console.log(`Verifying target availability...`);

  // Initial ping
  const ping = await sendRequest({ path: '/', method: 'GET', name: 'Ping' });
  if (!ping.success) {
    console.error(`ERROR: Target ${BASE_URL} responded with status ${ping.statusCode}. Is Next.js running?`);
    process.exit(1);
  }
  console.log(`Target is alive (Ping latency: ${ping.latency}ms).`);

  const STAGES = [1, 10, 25, 50, 100, 150, 200, 250];
  const stageSummaries = [];

  for (const c of STAGES) {
    const summary = await runConcurrencyStage(c, c >= 100 ? 5 : 3);
    stageSummaries.push(summary);
    // Cool-down pause between stages
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log('\n============================================================');
  console.log('SUMMARY TABLE: CONCURRENCY VS LATENCY & THROUGHPUT');
  console.log('============================================================');
  console.log(
    'Users'.padEnd(8) +
      'Requests'.padEnd(10) +
      'Success'.padEnd(10) +
      'Err %'.padEnd(8) +
      'Req/s'.padEnd(10) +
      'Mean(ms)'.padEnd(10) +
      'P95(ms)'.padEnd(10) +
      'P99(ms)'.padEnd(10)
  );

  for (const s of stageSummaries) {
    console.log(
      String(s.concurrency).padEnd(8) +
        String(s.totalRequests).padEnd(10) +
        String(s.successfulRequests).padEnd(10) +
        (s.errorRate + '%').padEnd(8) +
        String(s.throughput).padEnd(10) +
        String(s.percentiles.mean).padEnd(10) +
        String(s.percentiles.p95).padEnd(10) +
        String(s.percentiles.p99).padEnd(10)
    );
  }

  // Export results to JSON for inclusion in STACKUP_200_USER_TEST_REPORT.md
  import('fs').then((fs) => {
    fs.writeFileSync(
      'scripts/load-test-results.json',
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          targetUrl: BASE_URL,
          stages: stageSummaries,
        },
        null,
        2
      )
    );
    console.log('\nSaved full load testing telemetry to scripts/load-test-results.json');
  });
}

main().catch(console.error);
