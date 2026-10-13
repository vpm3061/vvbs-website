Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$brandRoot = Join-Path $PSScriptRoot 'assets/brand'
$family = [System.Drawing.FontFamily]::new('Arial')
function New-WordPath($text, $size, $x, $y) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddString($text, $family, 1, $size, [System.Drawing.PointF]::new($x,$y), [System.Drawing.StringFormat]::GenericTypographic)
  return ,$path
}
function Svg-Path($path) {
  $points = $path.PathPoints; $types = $path.PathTypes; $d = ''
  for ($i=0; $i -lt $points.Length; $i++) {
    $point = $points[$i]; $kind = $types[$i] -band 7
    $xy = $point.X.ToString('0.###',[cultureinfo]::InvariantCulture)+','+$point.Y.ToString('0.###',[cultureinfo]::InvariantCulture)
    if ($kind -eq 0) { $d += 'M'+$xy }
    elseif ($kind -eq 1) { $d += 'L'+$xy }
    elseif ($kind -eq 3) {
      $d += 'C'+$xy
      for ($j=0; $j -lt 2; $j++) { $i++; $point=$points[$i]; $d+=' '+$point.X.ToString('0.###',[cultureinfo]::InvariantCulture)+','+$point.Y.ToString('0.###',[cultureinfo]::InvariantCulture) }
    }
    if (($types[$i] -band 128) -ne 0) { $d+='Z' }
  }
  return $d
}
$mark = [System.Drawing.Drawing2D.GraphicsPath]::new()
$mark.AddPolygon([System.Drawing.PointF[]]@([System.Drawing.PointF]::new(12,18),[System.Drawing.PointF]::new(35,18),[System.Drawing.PointF]::new(64,83),[System.Drawing.PointF]::new(93,18),[System.Drawing.PointF]::new(116,18),[System.Drawing.PointF]::new(75,110),[System.Drawing.PointF]::new(53,110)))
$accent = [System.Drawing.Drawing2D.GraphicsPath]::new()
$accent.AddPolygon([System.Drawing.PointF[]]@([System.Drawing.PointF]::new(52,18),[System.Drawing.PointF]::new(76,18),[System.Drawing.PointF]::new(64,46)))
$word = New-WordPath 'VVBS' 76 138 0
$digital = New-WordPath 'D I G I T A L' 23 144 84
$gold = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#D7A74B'))
foreach ($variant in @('dark','light','transparent')) {
  $ink = if ($variant -eq 'light') {'#111722'} else {'#F2F3F5'}
  $background = if ($variant -eq 'dark') {'<rect width="400" height="128" rx="16" fill="#0B0D12"/>'} else {''}
  $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 128" role="img" aria-labelledby="title"><title id="title">VVBS Digital</title>'+$background+'<path fill="#D7A74B" d="'+(Svg-Path $mark)+'"/><path fill="'+$ink+'" d="'+(Svg-Path $accent)+'"/><path fill="'+$ink+'" d="'+(Svg-Path $word)+'"/><path fill="#D7A74B" d="'+(Svg-Path $digital)+'"/></svg>'
  [System.IO.File]::WriteAllText((Join-Path $brandRoot "vvbs-digital-$variant.svg"),$svg)
  $bitmap = [System.Drawing.Bitmap]::new(2400,768)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear($(if ($variant -eq 'dark') {[System.Drawing.ColorTranslator]::FromHtml('#0B0D12')} else {[System.Drawing.Color]::Transparent}))
  $graphics.ScaleTransform(6,6)
  $inkBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($ink))
  $graphics.FillPath($gold,$mark); $graphics.FillPath($inkBrush,$accent); $graphics.FillPath($inkBrush,$word); $graphics.FillPath($gold,$digital)
  $bitmap.Save((Join-Path $brandRoot "vvbs-digital-$variant.png"),[System.Drawing.Imaging.ImageFormat]::Png)
  $inkBrush.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
}
$icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0B0D12"/><path fill="#D7A74B" d="'+(Svg-Path $mark)+'"/><path fill="#F2F3F5" d="'+(Svg-Path $accent)+'"/></svg>'
[System.IO.File]::WriteAllText((Join-Path $brandRoot 'vvbs-digital-icon.svg'),$icon)
$bitmap=[System.Drawing.Bitmap]::new(1024,1024); $graphics=[System.Drawing.Graphics]::FromImage($bitmap); $graphics.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias; $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0B0D12')); $graphics.ScaleTransform(8,8); $graphics.FillPath($gold,$mark); $graphics.FillPath([System.Drawing.Brushes]::WhiteSmoke,$accent); $bitmap.Save((Join-Path $brandRoot 'vvbs-digital-icon.png'),[System.Drawing.Imaging.ImageFormat]::Png); $graphics.Dispose(); $bitmap.Dispose()
$mark.Dispose(); $accent.Dispose(); $word.Dispose(); $digital.Dispose(); $gold.Dispose(); $family.Dispose()
Compress-Archive -Path (Join-Path $brandRoot '*.svg'),(Join-Path $brandRoot '*.png') -DestinationPath (Join-Path $brandRoot 'vvbs-digital-logo-kit.zip') -Force
